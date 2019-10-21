import firebase from 'react-native-firebase';
import {
  AuthState,
  AuthActions,
  AUTH_ACTIONS,
  UserCredentials,
  UserSignUpCredentials,
  SetUser
} from './types';
import {Dispatch} from 'redux';

export const AuthInitialState: AuthState = {
  user: {},
};

export const authReducer = (
  state: AuthState = AuthInitialState,
  action: AuthActions,
) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export const getUser = (uid: string) => {
  const user = firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => doc.data());

  return user;
};

export const loginUser = (credentials: UserCredentials) => {
  return async (dispatch: Dispatch<SetUser>) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const user = await getUser(response.user.uid);
      dispatch({
        type: AUTH_ACTIONS.SET_USER,
        user,
      });
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const registerUser = (registerData: UserSignUpCredentials) => {
  return async (dispatch: Dispatch<SetUser>) => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          registerData.email,
          registerData.password,
        );
      await firebase
        .firestore()
        .collection('users')
        .doc(response.user.uid)
        .set({
          uid: response.user.uid,
          email: registerData.email,
          accountName: registerData.accountName,
        });
      const user = await getUser(response.user.uid);
      dispatch({
        type: AUTH_ACTIONS.SET_USER,
        user,
      });
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const forgotPassword = (email: string) => {
  return async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (e) {
      throw new Error(e);
    }
  };
};

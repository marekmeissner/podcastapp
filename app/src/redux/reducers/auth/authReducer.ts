import firebase from 'react-native-firebase';
import {
  AuthState,
  AuthActions,
  AUTH_ACTIONS,
  UserCredentials,
  SetUser,
  RemoveUser,
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
        credentials: action.credentials,
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
      const user = getUser(response.user.uid);
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

export const removeUser = (): RemoveUser => ({
  type: AUTH_ACTIONS.REMOVE_USER,
});

export const logoutUser = () => {
  return (dispatch: Dispatch<RemoveUser>) => {
    try {
    } catch (e) {
      throw e;
    } finally {
      dispatch({type: AUTH_ACTIONS.REMOVE_USER});
    }
  };
};

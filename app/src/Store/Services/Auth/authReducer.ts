import firebase from 'react-native-firebase';
import {
  AuthState,
  AuthActions,
  AUTH_ACTIONS,
  UserCredentials,
  UserSignUpCredentials,
  SetUser,
} from './types';
import {Dispatch} from 'redux';
import {RootState} from '../rootReducer';
import AuthService from './authService';

export const AuthInitialState: AuthState = {
  user: null,
  isLoggedIn: false,
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

export const loginUser = (credentials: UserCredentials) => {
  return async (dispatch: Dispatch<SetUser>) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const user = await AuthService.getUser(response.user.uid);
      const userToken = await response.user
        .getIdToken()
        .then(idToken => idToken);
      AuthService.setUserToken(userToken);
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
      const user = await AuthService.getUser(response.user.uid);
      const userToken = await response.user
        .getIdToken()
        .then(idToken => idToken);
      AuthService.setUserToken(userToken);
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

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

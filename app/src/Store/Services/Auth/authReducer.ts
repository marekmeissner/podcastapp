import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthState, AuthActions, AUTH_ACTIONS, User, UserCredentials, UserSignUpCredentials } from './types'
import { Dispatch } from 'redux'
import { RootState } from '../rootReducer'
import AuthService from './authService'

export const AuthInitialState: AuthState = {
  user: {
    uid: '',
    email: '',
    accountName: '',
  },
  isLoggedIn: false,
}

export const authReducer = (state: AuthState = AuthInitialState, action: AuthActions) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case AUTH_ACTIONS.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      }
    case AUTH_ACTIONS.SET_LOGGED_OUT:
      return AuthInitialState
    default:
      return state
  }
}

export const setUser = (user: any) => ({
  type: AUTH_ACTIONS.SET_USER,
  user,
})

export const setLoggedIn = () => ({
  type: AUTH_ACTIONS.SET_LOGGED_IN,
})

export const setLoggedOut = () => ({
  type: AUTH_ACTIONS.SET_LOGGED_OUT,
})

export const loginUser = (credentials: UserCredentials) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      const user = await AuthService.getUser(response.user.uid)
      const userToken = await response.user.getIdToken().then(idToken => idToken)
      await AuthService.setUserToken(userToken)
      dispatch(setUser(user))
      dispatch(setLoggedIn())
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const registerUser = (registerData: UserSignUpCredentials) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(registerData.email, registerData.password)
      await firestore()
        .collection('users')
        .doc(response.user.uid)
        .set({
          uid: response.user.uid,
          email: registerData.email,
          accountName: registerData.accountName,
        })
      const user = await AuthService.getUser(response.user.uid)
      const userToken = await response.user.getIdToken().then(idToken => idToken)
      await AuthService.setUserToken(userToken)
      dispatch(setUser(user))
      dispatch(setLoggedIn())
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const forgotPassword = (email: string) => {
  return async () => {
    try {
      await auth().sendPasswordResetEmail(email)
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      await AuthService.removeUserToken()
      dispatch(setLoggedOut())
    } catch (e) {
      throw new Error('Cannot logout')
    }
  }
}

export const selectUser = (state: RootState) => state.auth.user

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn

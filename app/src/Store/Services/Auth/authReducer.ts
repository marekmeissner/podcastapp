import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthState, AuthActions, AUTH_ACTIONS, UserCredentials, UserSignUpCredentials } from './types'
import { Dispatch } from 'redux'
import { RootState } from '../rootReducer'
import AuthService from './authService'

export const AuthInitialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
}

export const authReducer = (state: AuthState = AuthInitialState, action: AuthActions) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case AUTH_ACTIONS.SET_LOGGED_OUT:
      return AuthInitialState
    case AUTH_ACTIONS.FOLLOWING_FLOW:
      return {
        ...state,
        user: { ...state.user, following: action.followArray },
      }
    default:
      return state
  }
}

export const setUser = (user: any) => ({
  type: AUTH_ACTIONS.SET_USER,
  user,
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
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const getCurrentUser = (uid: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await AuthService.getUser(uid)
      dispatch(setUser(user))
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
          following: [],
        })
      const user = await AuthService.getUser(response.user.uid)
      const userToken = await response.user.getIdToken().then(idToken => idToken)
      await AuthService.setUserToken(userToken)
      dispatch(setUser(user))
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

export const followingFlow = (userId: string, followArray: string[]) => {
  return async (dispatch: Dispatch) => {
    try {
      await firestore()
        .doc(`users/${userId}`)
        .update({
          following: followArray,
        })
      dispatch({ type: AUTH_ACTIONS.FOLLOWING_FLOW, followArray })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const selectUser = (state: RootState) => state.auth.user

export const selectUserFollowing = (state: RootState) => state.auth.user.following

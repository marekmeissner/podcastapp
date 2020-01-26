import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {
  AuthState,
  AuthActions,
  AUTH_ACTIONS,
  UserCredentials,
  UserSignUpCredentials,
  SavedAudio,
  LoadUser,
  User,
  EditUser,
  SetUser,
  SetLoggedOut,
  FollowingFlow,
  SavedFlow,
} from './types'
import { Dispatch } from 'redux'
import { RootState } from '../rootReducer'
import AuthService from './authService'
import { merge } from 'lodash'

export const AuthInitialState: AuthState = {
  user: undefined,
  users: [],
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
        user: { ...state.user, following: action.followArray, followers: state.user && state.user.followers + 1 },
      }
    case AUTH_ACTIONS.SAVED_FLOW:
      return {
        ...state,
        user: { ...state.user, saved: action.savedArray },
      }
    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        users: merge([], state.users, [action.user]),
      }
    case AUTH_ACTIONS.EDIT_USER:
      return {
        ...state,
        user: merge({}, state.user, action.user),
      }
    default:
      return state
  }
}

export const loginUser = (credentials: UserCredentials) => {
  return async (dispatch: Dispatch<SetUser>) => {
    try {
      const response = await auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      const user = await AuthService.getUser(response.user.uid)
      const userToken = await response.user.getIdToken().then(idToken => idToken)
      await AuthService.setUserToken(userToken)
      dispatch({ type: AUTH_ACTIONS.SET_USER, user })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const getCurrentUser = (uid: string) => {
  return async (dispatch: Dispatch<SetUser>) => {
    try {
      const user = await AuthService.getUser(uid)
      dispatch({ type: AUTH_ACTIONS.SET_USER, user })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const registerUser = (registerData: UserSignUpCredentials) => {
  return async (dispatch: Dispatch<SetUser>) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(registerData.email, registerData.password)
      await firestore()
        .collection('users')
        .doc(response.user.uid)
        .set({
          uid: response.user.uid,
          email: registerData.email,
          accountName: registerData.name,
          followers: 0,
          following: [],
          saved: [],
        })
      const user = await AuthService.getUser(response.user.uid)
      const userToken = await response.user.getIdToken().then(idToken => idToken)
      await AuthService.setUserToken(userToken)
      dispatch({ type: AUTH_ACTIONS.SET_USER, user })
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
  return async (dispatch: Dispatch<SetLoggedOut>) => {
    try {
      await AuthService.removeUserToken()
      dispatch({ type: AUTH_ACTIONS.SET_LOGGED_OUT })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const followingFlow = (userId: string, followArray: string[], isNew: boolean) => {
  return async (dispatch: Dispatch<FollowingFlow>) => {
    try {
      await firestore()
        .doc(`users/${userId}`)
        .update({
          following: followArray,
        })
      await firestore()
        .doc(`users/${followArray[followArray.length - 1]}`)
        .update({
          followers: isNew ? firestore.FieldValue.increment(1) : firestore.FieldValue.increment(-1),
        })
      dispatch({ type: AUTH_ACTIONS.FOLLOWING_FLOW, followArray })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const savedFlow = (userId: string, savedArray: SavedAudio[]) => {
  return async (dispatch: Dispatch<SavedFlow>) => {
    try {
      await firestore()
        .doc(`users/${userId}`)
        .update({
          saved: savedArray,
        })
      dispatch({ type: AUTH_ACTIONS.SAVED_FLOW, savedArray })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const loadUser = (uid: string) => {
  return async (dispatch: Dispatch<LoadUser>) => {
    try {
      const user = await AuthService.getUser(uid)

      dispatch({ type: AUTH_ACTIONS.LOAD_USER, user })
      return user
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const editUser = (uid: string, user: Partial<User>) => {
  return async (dispatch: Dispatch<EditUser>) => {
    try {
      await AuthService.editUser(uid, user)
      dispatch({ type: AUTH_ACTIONS.EDIT_USER, user })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const selectUser = (state: RootState) => state.auth.user

export const selectUserFollowing = (state: RootState) => state.auth.user && state.auth.user.following

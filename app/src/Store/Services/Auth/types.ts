export interface AuthState {
  readonly user: User
  readonly isLoggedIn: boolean
}

export enum AUTH_ACTIONS {
  SET_USER = 'SET_USER',
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_LOGGED_OUT = 'SET_LOGGED_OUT',
  FOLLOWING_FLOW = 'SET_FOLLOWING_ARRAY',
}

export interface UserCredentials {
  email: string
  password: string
}

export interface UserSignUpCredentials {
  email: string
  password: string
  passwordRepeat: string
  accountName: string
}

export interface User {
  uid: string
  email: string
  accountName: string
  avatar?: string
  following: string[]
}

export interface SetUser {
  type: AUTH_ACTIONS.SET_USER
  user: any
}

export interface SetLoggedIn {
  type: AUTH_ACTIONS.SET_LOGGED_IN
}

export interface SetLoggedOut {
  type: AUTH_ACTIONS.SET_LOGGED_OUT
}

export interface FollowingFlow {
  type: AUTH_ACTIONS.FOLLOWING_FLOW
  followArray: string[]
}

export type AuthActions = SetUser | SetLoggedIn | SetLoggedOut | FollowingFlow

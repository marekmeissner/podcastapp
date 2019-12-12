export interface AuthState {
  readonly user?: User
  readonly users: User[]
}

export enum AUTH_ACTIONS {
  SET_USER = 'SET_USER',
  SET_LOGGED_OUT = 'SET_LOGGED_OUT',
  FOLLOWING_FLOW = 'SET_FOLLOWING_ARRAY',
  SAVED_FLOW = 'SET_SAVED_FLOW',
  LOAD_USER = 'LOAD_USER',
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
  accountDescription?: string
  avatar?: string
  following: string[]
  saved: SavedAudio[]
}

export interface SetUser {
  type: AUTH_ACTIONS.SET_USER
  user: any
}
export interface SetLoggedOut {
  type: AUTH_ACTIONS.SET_LOGGED_OUT
}

export interface FollowingFlow {
  type: AUTH_ACTIONS.FOLLOWING_FLOW
  followArray: string[]
}

export interface SavedAudio {
  uid: string
  id: string
  time: string
}

export interface SavedFlow {
  type: AUTH_ACTIONS.SAVED_FLOW
  savedArray: SavedAudio[]
}

export interface LoadUser {
  type: AUTH_ACTIONS.LOAD_USER
  user: User
}

export type AuthActions = SetUser | SetLoggedOut | FollowingFlow | SavedFlow | LoadUser

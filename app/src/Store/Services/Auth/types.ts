export interface AuthState {
  readonly user: User | null
  readonly isLoggedIn: boolean
}

export enum AUTH_ACTIONS {
  SET_USER = 'SET_USER',
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_LOGGED_OUT = 'SET_LOGGED_OUT',
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
  uid: strin
  email: string
  accountName: string
}

export interface SetUser {
  type: AUTH_ACTIONS.SET_USER
  user: void | object
}

export interface SetLoggedIn {
  type: AUTH_ACTIONS.SET_LOGGED_IN
}

export interface SetLoggedOut {
  type: AUTH_ACTIONS.SET_LOGGED_OUT
}

export type AuthActions = SetUser | SetLoggedIn | SetLoggedOut

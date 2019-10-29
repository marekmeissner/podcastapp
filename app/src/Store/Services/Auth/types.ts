export interface AuthState {
  readonly user: User | null;
  readonly isLoggedIn: boolean;
}

export enum AUTH_ACTIONS {
  SET_USER = 'SET_USER',
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserSignUpCredentials {
  email: string;
  password: string;
  passwordRepeat: string;
  accountName: string;
}

export interface User {
  uid: string;
  email: string;
  accountName: string;
}

export interface SetUser {
  type: AUTH_ACTIONS.SET_USER;
  user: void | object;
}

export type AuthActions = SetUser;
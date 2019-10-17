export interface AuthState {
  readonly user: User | {};
}

export enum AUTH_ACTIONS {
  SET_USER = 'SET_USER',
  REMOVE_USER = 'REMOVE_USER',
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
  user: Promise<void | object>;
}
export interface RemoveUser {
  type: AUTH_ACTIONS.REMOVE_USER;
}

export type AuthActions = SetUser | RemoveUser;

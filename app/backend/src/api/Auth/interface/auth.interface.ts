import { Credentials } from '../../../typings';

export interface UserWithToken {
  user: Credentials;
  token: string;
}

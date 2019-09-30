import { Credentials } from '../../typings';
import { AuthService } from './Auth.service';
import { UserWithToken } from './interface/auth.interface';

export class AuthController {
  public static login(user: Credentials): UserWithToken {
    return AuthService.login(user);
  }
}

import jwt from 'jsonwebtoken';
import { ENV } from '../../server/env/env';
import { Credentials } from '../../typings';
import { UserWithToken } from './interface/auth.interface';

export class AuthService {
  public static login(user: Credentials): UserWithToken {
    return {
      user,
      token: AuthService.createToken(user),
    };
  }

  public static createToken(user: Credentials): string {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
        password: user.password,
      },
      ENV.JWT_SECRET,
    );
  }
}

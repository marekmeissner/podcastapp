import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Auth, Common } from '../../util/constants';
import { Credentials } from '../../typings';
import { UnauthrorizedError, NotFoundError, HttpErrors } from '../../util/http_error';
import { User } from '../User/User.model';
import { RequestHandler } from 'express';
import { ENV } from '../../server/env/env';

const createLoginAuthStrategy = (userModel: typeof User): LocalStrategy => {
  return new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done): Promise<void> => {
      const user = await (userModel as typeof User)
        .findOne({ email: email.toLowerCase() })
        .exec();
      if (user == null) return done(NotFoundError(HttpErrors.UserNotFound));
      const [err, match] = await user.comparePassword(password);
      if (err) return done(err);
      return done(match ? null : UnauthrorizedError(HttpErrors.WrongPassword), user);
    },
  );
};

const createTokenAuthStrategy = (userModel: typeof User): JwtStrategy => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader(Common.AuthHeader),
    algorithms: ['HS256'],
    secretOrKey: ENV.JWT_SECRET,
  };
  return new JwtStrategy(
    jwtOptions,
    async (jwt, done): Promise<void> => {
      const user: Credentials = await (userModel as typeof User)
        .findById(jwt._id)
        .lean()
        .exec();
      if (user == null || user.email !== jwt.email || user.password !== jwt.password)
        return done(UnauthrorizedError());
      return done(null, user);
    },
  );
};

export const initializePassportStrategies = (): RequestHandler => {
  passport.use(Auth.UserLogin, createLoginAuthStrategy(User));
  passport.use(Auth.UserToken, createTokenAuthStrategy(User));
  return passport.initialize();
};

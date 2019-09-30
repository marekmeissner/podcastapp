import { RequestHandler } from 'express';
import passport from 'passport';
import { Auth } from '../util/constants';

export function authorize(strategy: Auth): RequestHandler {
  return passport.authenticate(strategy, { session: false });
}

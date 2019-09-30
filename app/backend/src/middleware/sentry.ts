import { RequestHandler, ErrorRequestHandler } from 'express';
import * as Sentry from '@sentry/node';
import { ENV } from '../server/env/env';

Sentry.init({
  dsn: ENV.SENTRY_DSN,
  environment: ENV.NODE_ENV,
});

export class SentryMiddleware {
  public static requestHandler(): RequestHandler {
    return Sentry.Handlers.requestHandler();
  }

  public static errorHandler(): ErrorRequestHandler {
    return Sentry.Handlers.errorHandler();
  }
}

import { NextFunction, Request } from 'express';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { APIResponse } from '../typings';
import { RES_BODY, RES_STATUS, HttpStatus, HttpResponse } from '../util/constants';
import { HttpError } from '../util/http_error';
import { logger } from '../util/logger';

export const errorHandler = function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: APIResponse,
  next: NextFunction,
): void {
  if (err instanceof HttpError) {
    logger.trace(err, `HTTP ERROR at ${req.path}:`);
    res[RES_BODY] = { error: err[RES_BODY] };
    res[RES_STATUS] = err[RES_STATUS];
  } else {
    logger.error(err, `SERVER ERROR at ${req.path}:`);
    res[RES_STATUS] = HttpStatus.InternalError;
    res[RES_BODY] = { error: HttpResponse.InternalError };
  }
  next();
} as ErrorRequestHandler;

import { NextFunction, Request, RequestHandler } from 'express';
import { APIResponse } from '../typings';
import { HttpResponse, HttpStatus, RES_BODY, RES_STATUS } from '../util/constants';
import { logger } from '../util/logger';

export const notFound = function notFoundMiddleware(
  req: Request,
  res: APIResponse,
  next: NextFunction,
): void {
  if (!res[RES_STATUS] && !res[RES_BODY]) {
    logger.error(`HTTP ERROR at url: ${req.url}: ${HttpResponse.NotFound}`);
    res[RES_STATUS] = HttpStatus.NotFound;
    res[RES_BODY] = HttpResponse.NotFound;
  }
  next();
} as RequestHandler;

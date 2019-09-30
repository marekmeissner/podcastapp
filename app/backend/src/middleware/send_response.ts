import { Request, RequestHandler, NextFunction } from 'express';
import { APIResponse } from '../typings';
import { RES_BODY, RES_STATUS } from '../util/constants';

export const sendResponse = function sendResponseMiddleware(
  _req: Request,
  res: APIResponse,
  next: NextFunction,
): void {
  if (!res.headersSent) res.status(res[RES_STATUS]).json(res[RES_BODY]);
  next();
} as RequestHandler;

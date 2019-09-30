import { NextFunction, Request, RequestHandler } from 'express';
import { APIResponse, Callback } from '../typings';
import { HttpStatus, RES_BODY, RES_STATUS } from '../util/constants';
import { logger } from '../util/logger';

export const controllerHandler = function controllerHandlerWrapper(
  controller: Callback,
  status = HttpStatus.Ok,
): RequestHandler {
  return async function controllerHandlerMiddleware(
    req: Request,
    res: APIResponse,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = await controller(req.user, res.locals);
      if (data instanceof Error) return next(data);
      res[RES_STATUS] = status;
      res[RES_BODY] = data == null ? {} : data;
      return next();
    } catch (err) {
      logger.error(err, `ERROR IN [${controller.name}] CONTROLLER: `);
      return next(err);
    }
  } as RequestHandler;
};

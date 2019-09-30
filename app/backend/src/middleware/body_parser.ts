import bodyparser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import { ENV } from '../server/env/env';

const jsonParser = bodyparser.json({ limit: ENV.JSON_CONTENT_LIMIT });

export const bodyParser = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    jsonParser(req, res, next);
  } else {
    next();
  }
};

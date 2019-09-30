import { Router } from 'express';
import cors from 'cors';
import { ENV } from '../server/env/env';

export const corsMiddleware = (router: Router): void => {
  if (ENV.NODE_ENV === 'development') {
    router.use(cors());
  }
};

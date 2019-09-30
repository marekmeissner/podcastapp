import { Router } from 'express';
import { ROUTE_APP } from '../route_constants';
import { authRouter } from './auth';

export const appRouter = Router();

appRouter.use(ROUTE_APP.AUTH, authRouter);
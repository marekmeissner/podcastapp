import express from 'express';
import { router } from '../route/main';

export const expressApp = express();
expressApp.disable('x-powered-by');
expressApp.use(router);

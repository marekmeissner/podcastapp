import pino from 'pino';
import { ENV } from '../server/env/env';

export const logger = pino();
logger.level = ENV.LOG_LEVEL;

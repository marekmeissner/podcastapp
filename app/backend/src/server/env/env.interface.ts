import { Level } from 'pino';
import { NODE_ENV } from '../../util/constants';

export interface EnvironmentVariables {
  DB_URL: string;
  LOG_LEVEL: Level;
  NODE_ENV: NODE_ENV;
  SENTRY_DSN: string;
  JSON_CONTENT_LIMIT: string | number;
  BCRYPT_SALT: number;
  JWT_SECRET: string;
  MAIL_FROM: string;
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_SERVICE?: string;
  MAIL_USER?: string;
  MAIL_PASS?: string;
  [key: string]: string | number | undefined | Level | NODE_ENV;
}

export interface EnvVarSchema {
  validator: Function;
  info: string;
  parse: Function;
}

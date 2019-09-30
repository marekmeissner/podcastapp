import { EnvironmentVariables, EnvVarSchema } from './env.interface';
import { parseEnv, isEnv } from './env.helper';

export const ENV = Object.create(null) as EnvironmentVariables;

const ENV_SCHEMAS: { [K in keyof EnvironmentVariables]: EnvVarSchema } = {
  NODE_ENV: {
    validator: (v: unknown): boolean =>
      typeof v === 'string' && ['production', 'development', 'test'].includes(v),
    info: 'NodeJS runtime environment.\nAccepts "production", "development" or "test".',
    parse: parseEnv.asIs,
  },
  DB_URL: {
    validator: (v: unknown): boolean => typeof v === 'string' && /^mongodb:\/\/.+$/.test(v),
    info:
      'Valid connection string used to connect to MongoDB [https://docs.mongodb.com/manual/reference/connection-string/].',
    parse: parseEnv.asIs,
  },
  LOG_LEVEL: {
    validator: isEnv.optional(isEnv.logLevel),
    info:
      'Defines logging level for pinojs logger [https://github.com/pinojs/pino/blob/master/docs/api.md#level].',
    parse: parseEnv.logLevel,
  },
  SENTRY_DSN: {
    validator: (v: unknown): boolean => typeof v === 'string' && /@sentry.io\//.test(v),
    info: 'Connection to Sentry project: Data Source Name.',
    parse: parseEnv.asIs,
  },
  JSON_CONTENT_LIMIT: {
    validator: isEnv.contentLimit,
    info:
      'Configures maximum length of request JSON body content[https://github.com/expressjs/body-parser/#limit].',
    parse: parseEnv.withDefault(parseEnv.asIs, 307200),
  },
  BCRYPT_SALT: {
    validator: (v: unknown): boolean => typeof v === 'string' && /^\d{1,2}$/.test(v),
    info:
      'Bcrypt cost value - determines strength password encryption [https://github.com/kelektiv/node.bcrypt.js].',
    parse: Number,
  },
  JWT_SECRET: {
    validator: (v: unknown): boolean => typeof v === 'string',
    info: 'JSON web token secret key [https://github.com/auth0/node-jsonwebtoken#readme].',
    parse: parseEnv.asIs,
  },
  MAIL_FROM: {
    validator: isEnv.string,
    info: 'Defines sender for mailing',
    parse: parseEnv.asIs,
  },
  MAIL_HOST: {
    validator: isEnv.string,
    info: 'SMTP Host',
    parse: parseEnv.asIs,
  },
  MAIL_PORT: {
    validator: isEnv.number,
    info: 'SMTP Port',
    parse: Number,
  },
  MAIL_SERVICE: {
    validator: isEnv.optional(isEnv.string),
    info: 'SMTP Service https://nodemailer.com/smtp/well-known/',
    parse: parseEnv.asIs,
  },
  MAIL_USER: {
    validator: isEnv.optional(isEnv.string),
    info: 'SMTP Service Auth User',
    parse: parseEnv.asIs,
  },
  MAIL_PASS: {
    validator: isEnv.optional(isEnv.string),
    info: 'SMTP Service Auth Password',
    parse: parseEnv.asIs,
  },
};

void (function createEnv(): void {
  Object.keys(ENV_SCHEMAS).forEach((key): void => {
    const env = ENV_SCHEMAS[key as keyof EnvironmentVariables] as EnvVarSchema;
    const value = process.env[key];

    if (!env.validator(value)) {
      const errorMessage = `Invalid [${key}] environment variable value (${value}).\nInfo: ${env.info}\n`;
      throw new Error(errorMessage);
    }
    ENV[key] = env.parse(value);
  });
})();

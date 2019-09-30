import { set, connect } from 'mongoose';
import { ENV } from './env/env';
import { logger } from '../util/logger';

const DB_CONNECT_RETRY_COUNT = 5;

export function connectToMongoDB(retries: number = DB_CONNECT_RETRY_COUNT): Promise<void> {
  logger.debug(`Connecting to DB.`);

  set('useFindAndModify', false);
  set('useCreateIndex', true);

  return new Promise((resolve, reject): void => {
    connect(
      ENV.DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ).then(
      (): void => (logger.debug('Connected to DB.'), resolve()),
      (err: Error): void => {
        logger.error(
          err,
          `Could not connect to DB. Attempt ${DB_CONNECT_RETRY_COUNT -
            retries +
            1}/${DB_CONNECT_RETRY_COUNT}`,
        );
        return retries > 0 ? resolve(connectToMongoDB()) : reject(err);
      },
    );
  });
}

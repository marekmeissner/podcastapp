import { compare, hash } from 'bcryptjs';
import { logger } from '../util/logger';
import { ENV } from '../server/env/env';

export class BcryptService {
  public static async hash(password: string): Promise<[Error?, string?]> {
    return new Promise((resolve): void => {
      hash(password, ENV.BCRYPT_SALT, (err, hash): void => {
        if (err) {
          logger.error(err, 'BCRYPT_SERVICE.HASH:');
          return resolve([err, undefined]);
        }
        return resolve([undefined, hash]);
      });
    });
  }

  public static async compareHash(str: string, hash: string): Promise<[Error?, boolean?]> {
    return new Promise((resolve): void => {
      compare(str, hash, (err, match): void => {
        if (err) {
          logger.error(err, 'BCRYPT_SERVICE.COMPARE:');
          return resolve([err, undefined]);
        }
        return resolve([undefined, match]);
      });
    });
  }
}

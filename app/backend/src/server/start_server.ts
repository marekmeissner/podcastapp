import { Server } from 'http';
import { expressApp } from './express_app';
import { connectToMongoDB } from './db_connect';
import { logger } from '../util/logger';

export async function startServer(PORT = 3001): Promise<Server | undefined> {
  try {
    await connectToMongoDB();
    const server = new Server(expressApp);

    server.on('listening', (): void => {
      logger.debug(`Server listening on port ${PORT}.`);
    });

    server.listen(PORT);
    return server;
  } catch (err) {
    logger.fatal(err, 'EXITING PROCESS DUE TO FATAL ERROR!');
  }

  return;
}

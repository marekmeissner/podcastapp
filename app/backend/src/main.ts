import { Server } from 'http';
import('./server/start_server').then(
  ({ startServer }): Promise<Server | undefined> => startServer(),
);

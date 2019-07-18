import * as express from 'express';

import * as server from '..';


export const config = (config: server.IConfig): server.IServer => ({
  start: () => {
    const app = express();

    for (const handler of config.handlers) {
      console.log(`[${handler.method}] ${handler.endpoint}`);
      createHandler(app, handler);
    }

    app.listen(config.port, () => console.log(`Server running on port: ${config.port}...`));
  }
})

const createHandler = (app: express.Express, handler: server.IHandler) => {
  switch (handler.method) {
    case 'GET':
      return app.get(handler.endpoint, handler.fn);
    case 'POST':
      return app.post(handler.endpoint, handler.fn);
    case 'PUT':
      return app.put(handler.endpoint, handler.fn);
    case 'DELETE':
      return app.delete(handler.endpoint, handler.fn);
  }
}
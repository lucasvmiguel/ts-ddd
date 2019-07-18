import * as server from '../server/express';

import * as user from '../user';

server.config({
  port: 3000,
  handlers: [
    { method: 'GET', endpoint: '/users/:id', fn: user.handlers.getUser }
  ]
}).start();
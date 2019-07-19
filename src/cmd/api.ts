import * as typeorm from 'typeorm';

import * as http from '../http';
import * as express from '../http/express';

import * as user from '../user';

(async () => {
  const conn = await typeorm.createConnection();
  const userRepository = conn.getRepository(user.User);

  express.config({
    port: 3000,
    handlers: [
      { method: http.Method.Get, endpoint: '/users/:id', fn: user.handlers.get(userRepository) },
      { method: http.Method.Post, endpoint: '/users', fn: user.handlers.create(userRepository) },
      { method: http.Method.Get, endpoint: '/users', fn: user.handlers.getAll(userRepository) },
    ]
  }).serve();
})();



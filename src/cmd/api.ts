import * as http from '../http';
import * as repository from '../repository';
import * as user from '../user';

(async () => {
  const conn = await repository.createConnection();
  const userRepository = conn.getRepository(user.User);

  http.express.config({
    port: 3000,
    handlers: [
      { method: http.Method.Get, endpoint: '/users/:id', fn: user.handlers.get(userRepository) },
      { method: http.Method.Post, endpoint: '/users', fn: user.handlers.create(userRepository) },
      { method: http.Method.Get, endpoint: '/users', fn: user.handlers.getAll(userRepository) },
    ]
  }).serve();
})();



import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as http from '..';


export const config = (config: http.IConfig): http.IServer => ({
  serve: () => {
    const app = express();

    app.use(bodyParser());

    console.log(`HTTP ROUTES:`);
    for (const handler of config.handlers) {
      console.log(`[${handler.method}] ${handler.endpoint}`);
      createHandler(app, handler);
    }
    console.log(`\n`);

    app.listen(config.port, () => console.log(`Server running on port: ${config.port}...`));
  }
})

const createHandler = (app: express.Express, handler: http.IHandler) => {
  switch (handler.method) {
    case http.Method.Get:
      return app.get(handler.endpoint, createFnHandler(handler.fn));
    case http.Method.Post:
      return app.post(handler.endpoint, createFnHandler(handler.fn));
    case http.Method.Put:
      return app.put(handler.endpoint, createFnHandler(handler.fn));
    case http.Method.Delete:
      return app.delete(handler.endpoint, createFnHandler(handler.fn));
  }
}

const createFnHandler = (handlerFn: http.IHandlerFn) => async (req: express.Request, res: express.Response) => {
  const response = await handlerFn({
    body: req.body,
    context: res.locals,
    headers: req.headers,
    params: req.params,
    query: req.query,
  });

  res.status(response.status).json(response.body);
};
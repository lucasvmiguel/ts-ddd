export enum Status {
  Success = 200,
  Created = 201,
  NotFound = 404,
  InternalServerError = 500,
}

export enum Method {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export interface IConfig {
  port: number;
  handlers: IHandler[];
}

export interface IServer {
  serve: () => void;
}

export interface IHandler {
  method: Method;
  endpoint: string;
  fn: IHandlerFn;
}

export interface IRequest {
  headers: { [name: string]: string | string[] };
  context: { [name: string]: any };
  params: { [name: string]: string };
  query: { [name: string]: string | string[] };
  body: any;
}

export interface IResponse {
  status: Status;
  headers?: { [name: string]: string };
  body: { message: string, data?: any, error?: Error }
}

export interface IHandlerFn {
  (req: IRequest): IResponse | Promise<IResponse>;
}

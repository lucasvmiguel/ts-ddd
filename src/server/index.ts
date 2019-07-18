export interface IConfig {
  port: number;
  handlers: IHandler[];
}

export interface IServer {
  start: () => void;
}

export interface IHandlerFn {
  (req: any, res: any): void;
}

export interface IHandler {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  fn: IHandlerFn;
}
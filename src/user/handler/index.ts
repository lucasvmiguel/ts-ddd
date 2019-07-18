import * as server from "../../server";

export const getUser: server.IHandlerFn = (req: any, res: any) => {
  res.status(200).json({
    id: req.params.id,
    name: 'Lucas'
  });
}
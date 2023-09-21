import { NextApiRequest, NextApiResponse } from "next";
import { commentscontroller } from ".";

async function routeMapper(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (true) {
    case method === 'GET':
      return commentscontroller.find(req, res);
      break;
    case method === 'POST':
      return commentscontroller.create(req, res);
      break;
    case method === 'PATCH':
      return commentscontroller.update(req, res);
      break;
    case method === 'DELETE':
      return commentscontroller.delete(req, res);
      break;
    default:
      return commentscontroller.notfound(req, res);
      break;
  }
}

export {
  routeMapper
}
import { NextApiRequest, NextApiResponse } from "next";
import { bidsController } from ".";

async function routeMapper(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const route = req.url?.split('/').slice(3)[0] ?? 'index';

  switch (true) {
    case method === 'GET' && route === 'index':
      return bidsController.find(req, res);
      break;
    case method === 'GET':
      return bidsController.findById(req, res);
      break;
    case method === 'POST':
      return bidsController.create(req, res);
      break;
    case method === 'DELETE':
      return bidsController.delete(req, res);
      break;
    default:
      return bidsController.notfound(req, res);
      break;
  }
}

export {
  routeMapper
}
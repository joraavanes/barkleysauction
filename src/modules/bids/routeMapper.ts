import { NextApiRequest, NextApiResponse } from "next";
import { bidsController } from ".";

async function routeMapper(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const route = req.url?.split('/').slice(3)[0] ?? 'index';

  switch (true) {
    case method === 'GET' && route === 'index':
      bidsController.find(req, res);
      break;
    case method === 'GET':
      bidsController.findById(req, res);
      break;
    default:
      break;
  }
}

export {
  routeMapper
}
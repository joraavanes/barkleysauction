import { NextApiRequest, NextApiResponse } from "next";
import { usersController } from ".";

async function routeMapper(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const query = req.url?.split('/')[3] ?? 'index';

  switch (true) {
    case query === 'index' && method === 'GET':
      usersController.getUsers(req, res);
      break;
    case query === 'index' && method === 'POST':
      usersController.create(req, res);
      break;
  }
}

export {
  routeMapper
}
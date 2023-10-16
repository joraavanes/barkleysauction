import { NextApiRequest, NextApiResponse } from "next";
import { usersController } from ".";

async function routeMapper(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const query = req.url?.split('/')[3] ?? 'index';

  switch (true) {
    case query === 'index' && method === 'GET':
      return usersController.getUsers(req, res);
      break;
    case method === 'GET':
      return usersController.findUser(req, res);
      break;
    case query === 'signup' && method === 'POST':
      return usersController.signup(req, res);
      break;
    default:
      return usersController.notFound(req, res);
      break;
  }
}

export {
  routeMapper
}
import { NextApiRequest, NextApiResponse } from "next";
import { routeMapper } from "../../../src/modules/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return routeMapper(req, res);
}

export default handler
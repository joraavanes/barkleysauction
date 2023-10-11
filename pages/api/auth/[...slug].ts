import { routeMapper } from "@/src/modules/auth";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  return routeMapper(req, res);
}

export default handler;
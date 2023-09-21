import { routeMapper } from "@/src/modules/comments";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  return routeMapper(req, res);
}

export default handler;
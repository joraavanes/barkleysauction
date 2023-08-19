import { NextApiRequest, NextApiResponse } from "next";
import { routeMapper } from "../../../src/modules/items";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    return routeMapper(req, res);
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;
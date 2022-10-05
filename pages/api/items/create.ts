import { NextApiRequest, NextApiResponse } from "next";
import { routeMapper } from "../../../src/modules/items";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    routeMapper(req, res);
}

export default handler;
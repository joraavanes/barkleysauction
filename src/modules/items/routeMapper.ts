import { NextApiRequest, NextApiResponse } from "next";
import { itemsController } from ".";

async function routeMapper(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const route = req.url?.split('/').slice(3)[0] ?? 'index';

    switch (true) {
        case method === 'GET' && route === 'index':
            return itemsController.index(req, res);
            break;
        case method === 'POST' && route === 'index':
            return itemsController.create(req, res);
            break;
        case method === 'GET':
            return itemsController.findById(req, res);
            break;
        case method === 'PATCH':
            return itemsController.edit(req, res);
            break;
        case method === 'DELETE':
            return itemsController.delete(req, res);
        default:
            break;
    }
}

export {
    routeMapper
}
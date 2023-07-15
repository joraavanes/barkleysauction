import { NextApiRequest, NextApiResponse } from "next";
import { itemsController } from ".";

async function routeMapper(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const route = req.url?.split('/').slice(3)[0] ?? 'index';

    switch (true) {
        case method === 'GET' && route === 'index':
            itemsController.index(req, res);
            break;
        case method === 'POST' && route === 'index':
            itemsController.create(req, res);
            break;
        case method === 'GET':
            itemsController.findById(req, res);
            break;
        case method === 'PATCH':
            itemsController.edit(req, res);
            break;
        case method === 'DELETE':
            itemsController.delete(req, res);
        default:
            break;
    }
}

export {
    routeMapper
}
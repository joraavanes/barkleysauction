import { NextApiRequest, NextApiResponse } from "next";
import { itemsController } from ".";

async function routeMapper(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const route = req.url?.split('/').slice(3).join('/') || 'index';

    switch (true) {
        case method === 'GET' && route === 'index':
            return itemsController.index(req, res);
            break;
        case method === 'POST':
            return itemsController.create(req, res);
            break;
        case method === 'GET' && /^\w{24}\/bids$/gm.test(route):
            return itemsController.findBidsOfItem(req, res);
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
            return itemsController.notFound(req, res);
            break;
    }
}

export {
    routeMapper
}
import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { ItemsService } from "./items.service";

@Service()
export class ItemsController {
    constructor(
        private itemsService: ItemsService
    ) { }

    index(req: NextApiRequest, res: NextApiResponse){
        const items = this.itemsService.getItems();
        res.status(200).json(items);
    }

    create(req: NextApiRequest, res: NextApiResponse){
        res.status(200).send('create route');
    }
}
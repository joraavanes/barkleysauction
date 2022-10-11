import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { ItemsService } from "./items.service";
import { Item } from './item.model';

@Service()
export class ItemsController {
    constructor(
        private itemsService: ItemsService
    ) { }

    async index(req: NextApiRequest, res: NextApiResponse) {
        const items = await this.itemsService.getItems();
        res.status(200).json(items);
    }

    async findById(req: NextApiRequest, res: NextApiResponse) {
        const id = req.query.id?.toString();
        if(!id) {
            return res.status(400).json({
                err: 'id is not found'
            });
        }
        
        const result = await this.itemsService.findById(id);
        res.status(200).json(result);
    }

    async create(req: NextApiRequest, res: NextApiResponse) {
        const {
            title,
            description,
            imageUrl
        } = req.body;

        const result = await this.itemsService.createItem({
            _id: new ObjectId(),
            title,
            description,
            bids: [],
            imageUrl
        } as Item);

        res.status(200)
            .send(result);
    }
}
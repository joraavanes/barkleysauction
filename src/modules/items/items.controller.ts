import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { ItemsService } from "./items.service";
import { CreateItem } from "./dtos/createItem.dto";

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
        if (!id) {
            return res.status(400).json({
                err: 'id is not found'
            });
        }

        const result = await this.itemsService.findById(id);
        res.status(200).json(result);
    }

    async create(req: NextApiRequest, res: NextApiResponse) {
        try {
            const body: CreateItem = req.body;

            const result = await this.itemsService.createItem(body);

            res.status(201)
                .send(result);
        }
        catch (err) {
            return res.status(400).send(err);
        }
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { ItemsService } from "./items.service";
import { CreateItem } from "./dtos/createItem.dto";
import { EditItem } from "./dtos/editItem.dto";

@Service()
export class ItemsController {
    constructor(
        private itemsService: ItemsService
    ) { }

    async index(req: NextApiRequest, res: NextApiResponse) {
        const items = await this.itemsService.getItems();
        return res.status(200).json(items);
    }

    async findById(req: NextApiRequest, res: NextApiResponse) {
        const id = req.query.id?.toString();
        if (!id) {
            return res.status(400).json({
                err: 'id is not found'
            });
        }

        const result = await this.itemsService.findById(id);
        return res.status(200).json(result);
    }

    async create(req: NextApiRequest, res: NextApiResponse) {
        try {
            const body: CreateItem = req.body;

            const result = await this.itemsService.createItem(body);

            return res.status(201)
                .send(result);
        }
        catch (err) {
            return res.status(400).send(err);
        }
    }

    async edit(req: NextApiRequest, res: NextApiResponse) {
        try {
            const id = req.query?.id as string;
            const body: EditItem = req.body;

            const result = await this.itemsService.editItem(id, body);

            return res.send(result);

        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async delete(req: NextApiRequest, res: NextApiResponse) {
        try {
            const id = req.query?.id as string;

            const result = await this.itemsService.deleteItem(id);
            return res.send(result);

        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { ItemsService } from "./items.service";
import { parseBody } from "../../utils/bodyParser";
import { CreateItem } from "./dtos/createItem.dto";

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
            const { fields, files } = await parseBody(req);
            const body = plainToClass(CreateItem, fields);

            const result = await this.itemsService.createItem(body);

            return res.status(201)
                .send(result);
        }
        catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }

    async edit(req: NextApiRequest, res: NextApiResponse) {
        try {
            const { fields, files } = await parseBody(req);

            const id = req.query?.id as string;
            const body = plainToClass(CreateItem, fields);

            const result = await this.itemsService.editItem(id, body);

            return res.send(result);

        } catch (error: any) { //todo: error type safety
            return res.status(400).send({ error: error.message });
        }
    }

    async delete(req: NextApiRequest, res: NextApiResponse) {
        try {
            const id = req.query?.id as string;

            const result = await this.itemsService.deleteItem(id);
            return res.send(result);

        } catch (error: any) { //todo: error type safety
            return res.status(400).send({ error: error.message });
        }
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { ItemsService } from "./items.service";
import { parseBody } from "../../utils/bodyParser";
import { CreateItem } from "./dtos/createItem.dto";
import { BidsService } from "../bids/bids.service";

@Service()
export class ItemsController {
    constructor(
        private itemsService: ItemsService,
        private bidsService: BidsService,
    ) { }

    async index(req: NextApiRequest, res: NextApiResponse) {
        const items = await this.itemsService.getItems();
        return res.status(200).json(items);
    }

    async findById(req: NextApiRequest, res: NextApiResponse) {
        const id = req.query.slug && req.query.slug[0];
        if (!id) {
            return res.status(400).json({
                err: 'id is not found'
            });
        }

        const result = await this.itemsService.findById(id);
        return res.status(200).json(result);
    }
    
    async findBidsOfItem(req: NextApiRequest, res: NextApiResponse) {
        const itemId = req.query.slug && req.query.slug[0] as string;

        if (!itemId) return res.status(400).send({ error: 'Item id is required' });

        const bids = await this.bidsService.getBidsOfItem(itemId);
        return res.send(bids);
    }

    async create(req: NextApiRequest, res: NextApiResponse) {
        try {
            const { fields, files } = await parseBody(req);
            const body = plainToClass(CreateItem, fields);

            const result = await this.itemsService.createItem(body, files);

            return res.status(201)
                .send(result);
        }
        catch (err) {
            // @ts-ignore
            return res.status(400).send({ error: err.message });
        }
    }

    async edit(req: NextApiRequest, res: NextApiResponse) {
        try {
            const { fields, files } = await parseBody(req);

            const itemId = req.query.slug && req.query.slug[0] as string;
            if (!itemId) return res.status(400).send({ error: 'Item id is required.' });

            const body = plainToClass(CreateItem, fields);

            const result = await this.itemsService.editItem(itemId, body, files);

            return res.send(result);

        } catch (error) {
            // @ts-ignore
            return res.status(400).send({ error: error.message });
        }
    }

    async delete(req: NextApiRequest, res: NextApiResponse) {
        try {
            const itemId = req.query.slug && req.query.slug[0] as string;
            if (!itemId) return res.status(400).send({ error: 'Item id is required.' });

            const result = await this.itemsService.deleteItem(itemId);
            return res.send(result);

        } catch (error: any) {
            // @ts-ignore
            return res.status(400).send({ error: error.message });
        }
    }

    notFound(req: NextApiRequest, res: NextApiResponse) {
        return res.status(404).send({});
    }
}
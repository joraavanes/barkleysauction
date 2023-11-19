import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { ItemsService } from "./items.service";
import { BidsService } from "../bids/bids.service";
import { UsersService } from "../auth/users.service";
import { parseBody } from "../../utils/bodyParser";
import { CreateItem } from "./dtos/createItem.dto";
import getErrorMessage from "@/shared/utility/resolveErrorMessage";

@Service()
export class ItemsController {
    constructor(
        private itemsService: ItemsService,
        private bidsService: BidsService,
        private usersService: UsersService
    ) { }

    async index(req: NextApiRequest, res: NextApiResponse) {
        const { page = 0, pageSize = 10 } = req.query;

        const items = await this.itemsService.getItems({ limit: +pageSize, offset: (+page) * (+pageSize) });
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

    // GET: /items/{itemId}/bids
    async findBidsOfItem(req: NextApiRequest, res: NextApiResponse) {
        const itemId = req.query.slug && req.query.slug[0] as string;
        const { page, pagesize } = req.query;

        if (!itemId) return res.status(400).send({ error: 'Item id is required' });

        const bids = await this.bidsService.getBidsOfItem(
            itemId,
            {
                limit: Number(pagesize),
                offset: Number(pagesize) * Number(page)
            });

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
        catch (error) {
            return res.status(400).send({ error: getErrorMessage(error) });
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
            return res.status(400).send({ error: getErrorMessage(error) });
        }
    }

    async delete(req: NextApiRequest, res: NextApiResponse) {
        try {
            const itemId = req.query.slug && req.query.slug[0] as string;
            if (!itemId) return res.status(400).send({ error: 'Item id is required.' });

            const result = await this.itemsService.deleteItem(itemId);
            return res.send(result);

        } catch (error: any) {
            return res.status(400).send({ error: getErrorMessage(error) });
        }
    }

    notFound(req: NextApiRequest, res: NextApiResponse) {
        return res.status(404).send({});
    }
}
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { BidsRepository } from "./bids.repository";
import { BidsService } from "./bids.service";
import { CreateBidDto } from "./dtos/createBid.dto";
import getErrorMessage from "@/shared/utility/resolveErrorMessage";

@Service()
export class BidsController {
  constructor(
    private bidsService: BidsService,
    private bidsRepository: BidsRepository
  ) { }

  async find(req: NextApiRequest, res: NextApiResponse) {
    const { page, pagesize } = req.query;

    const bids = await this.bidsRepository.find({ limit: Number(pagesize), offset: Number(page) * Number(pagesize) });
    return res.send(bids);
  }

  async findById(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query?.id as string;

    try {
      const bid = await this.bidsRepository.findOne({ _id: new ObjectId(id) });

      if (!bid) {
        return res.status(404).send({
          error: 'Item was not found'
        });
      }

      return res.send(bid);

    } catch {
      return res.status(400).send({
        error: 'Item was not found'
      });
    }
  }

  async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const body: CreateBidDto = req.body;
      const result = await this.bidsService.addBidToItem(body);

      return res.send(result);
    } catch (error) {
      return res.status(400).send({ error: getErrorMessage(error) });
    }
  }

  async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const bidId = req.query?.id as string;
      if (!bidId) return res.status(400).send({ error: 'Bid id is required.' });

      const result = await this.bidsService.delete(bidId);

      return res.send(result);
    } catch (error) {
      return res.status(400).send({ error: getErrorMessage(error) });
    }
  }

  notfound(req: NextApiRequest, res: NextApiResponse) {
    return res.status(404).send({});
  }
}
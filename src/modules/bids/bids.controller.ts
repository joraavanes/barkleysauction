import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { BidsRepository } from "./bids.repository";
import { Filter, ObjectId } from "mongodb";
import { Bid } from "./bid.model";

@Service()
export class BidsController {
  constructor(
    private bidsRepository: BidsRepository
  ) { }

  async find(req: NextApiRequest, res: NextApiResponse) {
    const bids = await this.bidsRepository.find();
    res.send(bids);
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

      res.send(bid);

    } catch (error) {
      return res.status(400).send({
        error: 'Item was not found'
      });
    }
  }
}
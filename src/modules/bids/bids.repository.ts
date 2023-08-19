import { Service } from "typedi";
import { BaseRepository } from "../../db/Repository";
import { Bid } from "./bid.model";

@Service()
export class BidsRepository extends BaseRepository<Bid> {
  constructor() {
    super('bids');
  }
}
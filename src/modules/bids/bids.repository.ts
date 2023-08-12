import { Service } from "typedi";
import { MongoDbClient } from "../../db";
import { BaseRepository } from "../../db/Repository";
import { Bid } from "./bid.model";

@Service()
export class BidsRepository extends BaseRepository<Bid> {
  constructor() {
    super(
      new MongoDbClient(),
      'bids'
    );
  }
}
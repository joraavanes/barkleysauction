import { Service } from "typedi";
import { MongoDbClient } from "../../db";
import { Item } from "./item.model";
import { BaseRepository } from "../../db/Repository";

@Service()
export class ItemsRepository extends BaseRepository<Item> {
  constructor() {
    super(
      new MongoDbClient(),
      'items'
    );
  }
}
import { Service } from "typedi";
import { Item } from "./item.model";
import { BaseRepository } from "../../db/Repository";

@Service()
export class ItemsRepository extends BaseRepository<Item> {
  constructor() {
    super('items');
  }
}
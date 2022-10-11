import { Service } from "typedi";
import { MongoDbClient } from "../../db";
import { Item } from "./item.model";

@Service()
export class ItemsRepository {
  constructor(
    private mongo: MongoDbClient
  ) { }

  async findAll() {
    return (await this.mongo.getClient())
      .db()
      .collection<Item>('items')
      .find()
      .toArray();
  }

  async findOne(attrs: Partial<Item>) {
    return (await this.mongo.getClient())
      .db()
      .collection<Item>('items')
      .findOne({
        ...attrs
      });
  }

  async createOne(model: Item) {
    return (await this.mongo.getClient())
      .db()
      .collection<Item>('items')
      .insertOne({
        ...model
      });
  }
}
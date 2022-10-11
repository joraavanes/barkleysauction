import { FindCursor, InsertOneResult, ObjectId, WithId } from "mongodb";
import { Service } from "typedi";
import { MongoDbClient } from "../../db";
import { Item } from "./item.model";

@Service()
export class ItemsRepository {
  constructor(
    private mongo: MongoDbClient
  ) { }

  async findAll(): Promise<WithId<Item>[]> {
    return (await this.mongo.getClient())
      .db()
      .collection<Item>('items')
      .find()
      .toArray();
  }

  async findOne(attrs: Partial<Item>): Promise<WithId<Item> | null> {
    return (await this.mongo.getClient())
      .db()
      .collection<Item>('items')
      .findOne({
        ...attrs
      });
  }

  async findById(id: string): Promise<WithId<Item>|null> {
    return (await this.mongo.getClient())
      .db()
      .collection<Item>('items')
      .findOne({
        _id: new ObjectId(id)
      });
  }

  async createOne(model: Item): Promise<InsertOneResult<WithId<Item>>> {
    return (await this.mongo.getClient())
      .db()
      .collection<Item>('items')
      .insertOne({
        ...model
      });
  }

}
import { ObjectId, WithId } from "mongodb";
import { Service } from "typedi";
import { MongoDbClient } from "../../db";
import { User } from "./models/user.model";

@Service()
export class UsersRepository {
  constructor(
    private mongo: MongoDbClient
  ) { }

  async createOne(model: User) {
    return (await this.mongo.getClient())
      .db()
      .collection('users')
      .insertOne(model);
  }

  async findById(id: string) {
    console.log(id);
    return (await this.mongo.getClient())
      .db()
      .collection('users')
      .findOne({
        _id: new ObjectId(id)
      });
  }

  async findAll(): Promise<WithId<User>[]> {
    return await (await this.mongo.getClient())
      .db()
      .collection<User>('user')
      .find()
      .toArray();
  }
}
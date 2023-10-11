import { ObjectId, WithId } from "mongodb";
import { Service } from "typedi";
import { MongoDbClient } from "../../db";
import { User } from "./models/user.model";
import { BaseRepository } from "@/src/db/Repository";

@Service()
export class UsersRepository extends BaseRepository<User> {
  constructor(
    private mongo: MongoDbClient
  ) { 
    super('users');
  }

  async createOne(model: User) {
    return (await this.mongo.getClient())
      .db()
      .collection('users')
      .insertOne(model);
  }

  async findById(id: string) {
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
      .collection<User>('users')
      .find()
      .toArray();
  }
}
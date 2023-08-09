import {
  InsertOneResult,
  ModifyResult,
  Document,
  Filter,
  WithId,
  OptionalUnlessRequiredId
} from "mongodb";
import { MongoDbClient } from "../db";
import { IRead, IWrite } from "./types";

export abstract class BaseRepository<T extends Document> implements IRead<T>, IWrite<T>{
  private collectionName: string;
  private mongoClient: MongoDbClient;

  constructor(mongoClient: MongoDbClient, collectionName: string) {
    this.mongoClient = mongoClient;
    this.collectionName = collectionName;
  }

  private async getDb() {
    return (await this.mongoClient.getClient()).db();
  }

  private async getCollection() {
    return (await this.mongoClient.getClient()).db().collection<T>(this.collectionName);
  }

  async find(): Promise<WithId<T>[]> {
    const collection = await this.getCollection();
    return collection.find().toArray();
  }

  async findOne(filter: Filter<T>): Promise<WithId<T> | null> {
    const collection = await this.getCollection();
    return collection.findOne(filter);
  }

  async create(item: OptionalUnlessRequiredId<T>): Promise<InsertOneResult> {
    const collection = await this.getCollection();
    return collection.insertOne(item);
  }

  async update(filter: Filter<T>, attrs: OptionalUnlessRequiredId<T>): Promise<ModifyResult<T>> {
    const collection = await this.getCollection();
    return collection.findOneAndUpdate(filter, { $set: attrs });
  }

  async delete(filter: Filter<T>): Promise<ModifyResult<T>> {
    const collection = await this.getCollection();
    return collection.findOneAndDelete(filter);
  }
}

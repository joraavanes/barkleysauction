import {
  InsertOneResult,
  ModifyResult,
  Document,
  Filter,
  WithId,
  OptionalUnlessRequiredId
} from "mongodb";
import { Inject } from "typedi";
import { MongoDbClient } from "../db";
import { IRead, IWrite } from "./types";

export abstract class BaseRepository<T extends Document> implements IRead<T>, IWrite<T>{
  @Inject()
  private mongoClient: MongoDbClient;
  private collectionName: string;

  constructor(collectionName: string) {
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

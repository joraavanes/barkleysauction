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
import { IRead, IWrite, Pagination } from "./types";

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

  async find(pagination: Pagination): Promise<WithId<T>[]> {
    const collection = await this.getCollection();
    return collection.find().skip(pagination.offset).limit(pagination.limit).sort({ createdAt: -1 }).toArray();
  }

  async findOne(filter: Filter<T>): Promise<WithId<T> | null> {
    const collection = await this.getCollection();
    return collection.findOne(filter);
  }

  async filter(filter: Filter<T> = {}, pagination: Pagination) {
    const collection = await this.getCollection();
    return collection.find(filter).skip(pagination.offset).limit(pagination.limit).sort({ createdAt: -1 }).toArray();
  }

  async create(item: OptionalUnlessRequiredId<T>): Promise<InsertOneResult> {
    const collection = await this.getCollection();
    return collection.insertOne(item);
  }

  async update(filter: Filter<T>, attrs: OptionalUnlessRequiredId<T>): Promise<ModifyResult<T>> {
    const collection = await this.getCollection();
    return collection.findOneAndUpdate(filter, { $set: attrs }, { returnDocument: "after" });
  }

  async delete(filter: Filter<T>): Promise<ModifyResult<T>> {
    const collection = await this.getCollection();
    return collection.findOneAndDelete(filter);
  }
}

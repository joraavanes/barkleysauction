import { WithId, OptionalUnlessRequiredId, InsertOneResult, ModifyResult, Filter } from 'mongodb';

export interface IRead<T> {
  find(): Promise<WithId<T>[]>;
  findOne(filter: Filter<T>): Promise<WithId<T> | null>;
}

export interface IWrite<T> {
  create(item: OptionalUnlessRequiredId<T>): Promise<InsertOneResult>;
  update(filter: Filter<T>, attrs: OptionalUnlessRequiredId<T>): Promise<ModifyResult<T>>;
  delete(filter: Filter<T>): Promise<ModifyResult<T>>;
}
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
}
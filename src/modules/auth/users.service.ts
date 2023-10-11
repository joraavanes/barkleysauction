import { Service } from "typedi";
import { User } from "./models/user.model";
import { UsersRepository } from "./users.respository";
import { ObjectId } from "mongodb";

@Service()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  findUser(id: string) {
    return this.usersRepository.findOne({ _id: new ObjectId(id) })
  }

  async getAll() {
    return this.usersRepository.findAll();
  }

  async createUser(model: User) {
    return this.usersRepository.createOne(model);
  }
}
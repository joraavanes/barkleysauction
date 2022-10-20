import { Service } from "typedi";
import { User } from "./models/user.model";
import { UsersRepository } from "./users.respository";

@Service()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  async createUser(model: User){
    return this.usersRepository.createOne(model);
  }
}
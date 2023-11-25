import { scrypt as _scrypt, randomBytes } from 'node:crypto';
import { Service } from "typedi";
import { User } from "./models/user.model";
import { UsersRepository } from "./users.respository";
import { Filter, ObjectId } from "mongodb";
import { promisify } from 'node:util';
import { Pagination } from '@/src/db/types';

const scrypt = promisify(_scrypt);

@Service()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  findUser(id: string) {
    return this.usersRepository.findOne({ _id: new ObjectId(id) })
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async getAll(pagination: Pagination, filter: Filter<User>) {
    return this.usersRepository.filter(filter, pagination);
  }

  async createUser(model: User) {
    const existingUser = await this.findByEmail(model.email);

    if (existingUser) {
      throw new Error('User with the email already exists');
    }

    const salt = randomBytes(16).toString('hex');

    const hash = await scrypt(model.password, salt, 32) as Buffer;
    const hashWithSalt = `${hash.toString('hex')}.${salt}`;

    const user: User = {
      ...model,
      password: hashWithSalt,
      createdAt: new Date()
    };

    return this.usersRepository.create(user);
  }
}
import { NextApiRequest, NextApiResponse } from "next";
import { Service } from "typedi";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";

@Service()
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  async getUsers(req: NextApiRequest, res: NextApiResponse){
    const model = await this.usersService.getAll();
    res.status(200).send(model);
  }

  async create(req: NextApiRequest, res: NextApiResponse) {
    const model: User  = req.body;

    const result = await this.usersService.createUser(model);
    res.status(200).send(result);
  }

  notFound(req: NextApiRequest, res: NextApiResponse) {
    return res.status(404).send({});
  }
}
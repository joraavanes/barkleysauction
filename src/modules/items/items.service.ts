import { Service } from "typedi";
import { MongoDbClient } from "../../db";
import { UsersRepository } from "../auth/users.respository";
import { CreateItem } from "./dtos/createItem.dto";
import { Item } from "./item.model";
import { ItemsRepository } from "./items.repository";

@Service()
export class ItemsService {
    constructor(
        private itemsRespository: ItemsRepository,
        private usersRepository: UsersRepository
    ) { }

    getItems() {
        return this.itemsRespository.findAll();
    }

    findById(id: string) {
        return this.itemsRespository.findById(id);
    }

    async createItem(model: CreateItem) {
        const user = await this.usersRepository.findById(model.UserId);
        
        if(!user)
            throw new Error('User doesn\'t exist');
        
        return this.itemsRespository.createOne({
            title: model.title,
            description: model.description,
            imageUrl: model.imageUrl,
            owner: user._id
        } as Item);
    }
}
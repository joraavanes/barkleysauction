import { Service } from "typedi";
import { UsersRepository } from "../auth/users.respository";
import { CreateItem } from "./dtos/createItem.dto";
import { EditItem } from "./dtos/editItem.dto";
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

        if (!user)
            throw new Error('User doesn\'t exist');

        return this.itemsRespository.createOne({
            title: model.title,
            description: model.description,
            bids: Array<number>(),
            startingBid: model.startingBid,
            imageUrl: model.imageUrl,
            owner: user._id
        } as Item);
    }

    async editItem(id: string, model: EditItem) {
        const item = await this.itemsRespository.findById(id);

        if (!item)
            throw new Error('Item does not exist');

        return this.itemsRespository.editOne(id, model);
    }

    async deleteItem(id: string) {
        const item = await this.itemsRespository.findById(id);

        if (!item)
            throw new Error('Item does not exist');

        return this.itemsRespository.deleteOne(id);
    }
}
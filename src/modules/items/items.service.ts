import { Service } from "typedi";
import { MongoDbClient } from "../../db";
import { Item } from "./item.model";
import { ItemsRepository } from "./items.repository";

@Service()
export class ItemsService {
    constructor(
        private mongo: MongoDbClient,
        private respository: ItemsRepository
    ) { }

    getItems() {
        return this.respository.findAll();
    }

    findById(id: string) {
        return this.respository.findById(id);
    }

    async createItem(model: Item) {
        return this.respository.createOne(model);
    }
}
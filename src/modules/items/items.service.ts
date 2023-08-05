import { Service } from "typedi";
import { UsersRepository } from "../auth/users.respository";
import { CreateItem } from "./dtos/createItem.dto";
import { EditItem } from "./dtos/editItem.dto";
import { Item } from "./item.model";
import { ItemsRepository } from "./items.repository";
import formidable, { File } from "formidable";
import { FileService } from "../file/file.service";

@Service()
export class ItemsService {
    constructor(
        private itemsRespository: ItemsRepository,
        private usersRepository: UsersRepository,
        private fileService: FileService
    ) { }

    getItems() {
        return this.itemsRespository.findAll();
    }

    findById(id: string) {
        return this.itemsRespository.findById(id);
    }

    private async storeItemImage(files: formidable.Files): Promise<string> {
        try {
            const images = files.image as Array<formidable.File>;
            const itemImage = images[0] as File;

            const imageBuffer = await this.fileService.readFile(itemImage.filepath);

            const pathToStore = await this.fileService.getFilePath({
                directory: process.env.STATIC_FILES_DIR,
                mimetype: itemImage.originalFilename?.split('.').at(-1) as string,
            });

            await this.fileService.writeFile(pathToStore, imageBuffer);

            return this.fileService.getRelativePathFromAbsolute(pathToStore).replace(process.env.STATIC_FILES_DIR as string, '');
        } catch (error) {
            throw error;
        }
    }

    async createItem(model: CreateItem, files: formidable.Files) {
        const user = await this.usersRepository.findById(model.UserId);

        if (!user)
            throw new Error('User doesn\'t exist');

        const imageUrl = await this.storeItemImage(files);

        return this.itemsRespository.createOne({
            title: model.title,
            description: model.description,
            bids: Array<number>(),
            startingBid: model.startingBid,
            imageUrl,
            owner: user._id
        } as Item);
    }

    async editItem(id: string, model: EditItem) {
        const item = await this.itemsRespository.findById(id);

        if (!item)
            throw new Error('Item does not exist');

        return this.itemsRespository.editOne(id, {
            title: model.title,
            description: model.description,
            bids: Array<number>(),
            startingBid: model.startingBid,
            imageUrl: model.imageUrl,
        });
    }

    async deleteItem(id: string) {
        const item = await this.itemsRespository.findById(id);

        if (!item)
            throw new Error('Item does not exist');

        return this.itemsRespository.deleteOne(id);
    }
}
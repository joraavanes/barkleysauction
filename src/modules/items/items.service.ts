import path from "path";
import { Service } from "typedi";
import { UsersRepository } from "../auth/users.respository";
import { CreateItem } from "./dtos/createItem.dto";
import { EditItem } from "./dtos/editItem.dto";
import { Item } from "./item.model";
import { ItemsRepository } from "./items.repository";
import formidable, { File } from "formidable";
import { FileService } from "../file/file.service";
import { Filter, ObjectId } from "mongodb";
import { Pagination } from "@/src/db/types";
import { CloudStorage } from "../cloud/cloud-storage.service";

@Service()
export class ItemsService {
    constructor(
        private itemsRespository: ItemsRepository,
        private usersRepository: UsersRepository,
        private fileService: FileService,
        private cloudStorage: CloudStorage
    ) { }

    async getItems(pagination: Pagination, filter?: Filter<Item>) {
        const serializedFilter = {
            ...filter,
            title: new RegExp(filter?.title, "i"),
            description: new RegExp(filter?.description, "i"),
            ...(filter?.startingBid ? { startingBid: Number(filter?.startingBid) } : undefined)
        };
        
        return (await this.itemsRespository.filter(serializedFilter, pagination)).map(item => ({
            ...item,
            _id: item._id.toString(),
            owner: item.owner?.toString() ?? "",
            createdAt: item.createdAt?.valueOf() ?? "",
            updatedAt: item.updatedAt?.valueOf() ?? "",
        }));
    }

    async findById(id: string) {
        const item = await this.itemsRespository.findOne({ _id: new ObjectId(id) });

        if (!item) return null;

        return {
            ...item,
            _id: item._id.toString(),
            owner: item.owner?.toString() ?? "",
            createdAt: item.createdAt?.valueOf() ?? "",
            updatedAt: item.updatedAt?.valueOf() ?? "",
        };
    }

    private async storeItemImageLocally(files: formidable.Files): Promise<string> {
        try {
            const images = files.image as Array<formidable.File>;
            const itemImage = images[0] as File;

            const imageBuffer = await this.fileService.readFile(itemImage.filepath);

            if (this.fileService.getDataSize(imageBuffer) > parseFloat(process.env.MAX_USER_FILE as string)) {
                throw new Error('File size exceeds maximum limit')
            }

            const pathToStore = await this.fileService.getFilePath({
                directory: path.join(process.env.STATIC_FILES_DIR!, 'userdata'),
                mimetype: itemImage.originalFilename?.split('.').at(-1) as string,
            });

            await this.fileService.writeFile(pathToStore, imageBuffer);

            return this.fileService.getRelativePathFromAbsolute(pathToStore).replace(process.env.STATIC_FILES_DIR as string, '');
        } catch (error) {
            throw error;
        }
    }

    private async storeItemImageOnCloud(files: formidable.Files): Promise<string> {
        const images = files.image as Array<formidable.File>;
        const itemImage = images[0] as File;

        const imageBuffer = await this.fileService.readFile(itemImage.filepath);

        if (this.fileService.getDataSize(imageBuffer) > parseFloat(process.env.MAX_USER_FILE as string)) {
            throw new Error('File size exceeds maximum limit')
        }

        await this.cloudStorage.putMediaObject(imageBuffer, itemImage.originalFilename ?? 'test-image.png');

        return `${process.env.S3_HOSTNAME}/${itemImage.originalFilename}`;
    }

    async createItem(model: CreateItem, files: formidable.Files) {
        const user = await this.usersRepository.findOne({ _id: new ObjectId(model.UserId) });

        if (!user)
            throw new Error('User doesn\'t exist');

        const imageUrl = await this.storeItemImageOnCloud(files);

        return this.itemsRespository.create({
            title: model.title,
            description: model.description,
            bids: Array<number>(),
            startingBid: model.startingBid,
            imageUrl,
            owner: user._id,
            createdAt: new Date()
        } as Item);
    }

    async editItem(id: string, model: EditItem, files: formidable.Files) {
        const item = await this.itemsRespository.findOne({ _id: new ObjectId(id) });

        if (!item)
            throw new Error('Item does not exist');

        if (files.image) {
            model.imageUrl = await this.storeItemImageOnCloud(files);

            if (item.imageUrl) {
                await this.cloudStorage.deleteMediaObject(item.imageUrl);
            }
        }

        const updatedModel: Item = {
            ...item,
            ...model,
            updatedAt: new Date()
        };

        return this.itemsRespository.update({ _id: new ObjectId(id) }, updatedModel);
    }

    async deleteItem(id: string) {
        const item = await this.itemsRespository.findOne({ _id: new ObjectId(id) });

        if (!item)
            throw new Error('Item does not exist');

        const deleteItemResult = await this.itemsRespository.delete({ _id: new ObjectId(id) });

        if (!deleteItemResult.ok) {
            throw new Error('Failed to remove item');
        }

        if (item.imageUrl) {
            await this.cloudStorage.deleteMediaObject(item.imageUrl)
        }

        return;
    }
}
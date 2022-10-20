import { ObjectId } from "mongodb";
import { Item } from "../../items/item.model";

export interface User {
    _id: ObjectId,
    email: string;
    password: string;
    userConfirmed: boolean;
    name: string;
    surname: string;
    items?: Array<ObjectId>;
}
import { ObjectId } from "mongodb";
import { User } from "../auth/models/user.model";

export interface Item {
    _id: ObjectId;
    title: string;
    description: string;
    bids: Array<number>;
    imageUrl?: string;
    owner?: User;
}
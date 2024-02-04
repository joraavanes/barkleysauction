import { ObjectId } from "mongodb";
import { User } from "../auth/models/user.model";

export type Item = {
    _id: ObjectId;
    title: string;
    description: string;
    bids: Array<number>;
    startingBid: number;
    imageUrl?: string;
    userId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
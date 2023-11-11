import { ObjectId } from "mongodb";

export type User = {
    _id: ObjectId,
    email: string;
    password: string;
    userConfirmed: boolean;
    firstname: string;
    lastname: string;
    items?: Array<ObjectId>;
    createdAt: Date;
    updatedAt: Date;
}
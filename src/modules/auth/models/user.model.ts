import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId,
    email: string;
    password: string;
    userConfirmed: boolean;
    firstname: string;
    lastname: string;
    items?: Array<ObjectId>;
}
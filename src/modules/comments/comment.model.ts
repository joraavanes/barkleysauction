import { ObjectId } from "mongodb"

export type Comment = {
  _id: ObjectId;
  content: string;
  item: ObjectId;
  user: ObjectId;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
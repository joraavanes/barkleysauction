import { ObjectId } from "mongodb";

export interface Bid {
  _id: ObjectId;
  price: number;
  bidder: ObjectId;
  item: ObjectId;
  createdAt: Date;
}
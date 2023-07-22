import { Type } from "class-transformer";

export class CreateItem {
  title: string;
  
  description: string;

  @Type(() => Number)
  startingBid: number;

  imageUrl: string;

  UserId: string;
}
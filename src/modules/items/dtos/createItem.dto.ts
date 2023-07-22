import { Transform, Type } from "class-transformer";

export class CreateItem {
  title: string;

  description: string;

  @Type(() => Number)
  startingBid: number;

  @Transform(({ value }) => value && value !== 'null' ? value : null)
  imageUrl: string;

  UserId: string;
}
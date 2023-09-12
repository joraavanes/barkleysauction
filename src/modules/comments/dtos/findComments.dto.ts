import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

export class FindCommentsDto {
  @IsOptional()
  @Transform(({ value }) => new ObjectId(value))
  item: ObjectId;

  @IsOptional()
  @Transform(({ value }) => new ObjectId(value))
  user: ObjectId;
}
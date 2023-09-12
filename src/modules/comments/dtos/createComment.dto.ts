import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateCommentDto {
  @IsString()
  content: string;

  @Transform(({ value }) => new ObjectId(value))
  item: ObjectId;

  @Transform(({ value }) => new ObjectId(value))
  user: ObjectId;
}
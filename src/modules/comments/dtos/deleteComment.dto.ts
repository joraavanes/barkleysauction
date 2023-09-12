import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class DeleteCommentDto {
  @Transform(({ value }) => new ObjectId(value))
  _id: ObjectId;

  @IsString()
  content: string;

  @Transform(({ value }) => new ObjectId(value))
  user: ObjectId;
}
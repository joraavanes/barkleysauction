import { Service } from "typedi";
import { ObjectId, OptionalId } from 'mongodb';
import { CommentsRepository } from "./comments.repository";
import { Pagination } from "@/src/db/types";
import { ItemsRepository } from "../items/items.repository";
import { Comment } from "./comment.model";
import { CreateCommentDto, DeleteCommentDto, UpdateCommentDto, FindCommentsDto } from "./dtos";
import { UsersRepository } from "../auth/users.respository";

@Service()
export class CommentsService {
  constructor(
    private itemsRepo: ItemsRepository,
    private usersRepo: UsersRepository,
    private commentsRepo: CommentsRepository
  ) { }

  getCommentsOfItem(dto: FindCommentsDto, pagination: Pagination) {
    return this.commentsRepo.filter(dto, pagination);
  }

  async addComment(dto: CreateCommentDto) {
    const item = await this.itemsRepo.findOne({ _id: dto.item });
    const user = await this.usersRepo.findById(dto.user.toString());

    if (!item) throw new Error('Item has not been found.');
    if (!user) throw new Error('User has not been found.');

    const model: OptionalId<Comment> = {
      ...dto,
      approved: true,
      username: user.name,
      createdAt: new Date()
    };

    return this.commentsRepo.create(model as Comment);
  }

  async updateComment(commentId: string, dto: UpdateCommentDto) {
    const item = await this.itemsRepo.findOne({ _id: dto.item });
    if (!item) throw new Error('Item has not been found.');

    const storedComment = await this.commentsRepo.findOne({ _id: new ObjectId(commentId) });
    if (!storedComment) throw new Error('Comment has not been found');

    const updatedComment: Comment = {
      ...storedComment,
      ...dto,
      content: dto.content,
      updatedAt: new Date()
    };

    return this.commentsRepo.update({ _id: new ObjectId(commentId) }, updatedComment);
  }

  async deleteComment(commentId: string) {
    const comment = await this.commentsRepo.findOne({ _id: new ObjectId(commentId) });

    if (!comment) throw new Error('Comment has not been found');

    return this.commentsRepo.delete({ _id: new ObjectId(commentId) });
  }
}
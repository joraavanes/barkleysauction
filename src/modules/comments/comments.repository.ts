import { BaseRepository } from "@/src/db/Repository";
import { Service } from "typedi";
import { Comment } from "./comment.model";

@Service()
export class CommentsRepository extends BaseRepository<Comment> {
  constructor() {
    super('comments')
  }
}
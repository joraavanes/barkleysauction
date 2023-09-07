import { Service } from "typedi";
import { CommentsRepository } from "./comments.repository";

@Service()
export class CommentsService {
  constructor(
    private commentsRepo: CommentsRepository
  ) { }
}
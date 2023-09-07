import { Service } from "typedi";
import { CommentsService } from "./comments.service";

@Service()
export class CommentsController {
  constructor(
    private commentsService: CommentsService
  ) { }
}
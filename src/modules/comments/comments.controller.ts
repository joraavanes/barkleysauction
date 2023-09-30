import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { NextApiRequest, NextApiResponse } from "next";
import { CommentsService } from "./comments.service";
import { CreateCommentDto, FindCommentsDto, UpdateCommentDto } from "./dtos";
import getErrorMessage from "@/shared/utility/resolveErrorMessage";

@Service()
export class CommentsController {
  constructor(
    private commentsService: CommentsService
  ) { }

  async find(req: NextApiRequest, res: NextApiResponse) {
    try {
      const [item, user] = req.query.params as string[];
      const dto: FindCommentsDto = plainToClass(FindCommentsDto, { ...(item && { item }), ...(user && { user }) });
      const comments = await this.commentsService.getCommentsOfItem(dto, { limit: 10, offset: 0 });

      return res.status(200).json(comments);

    } catch (error) {
      return res.status(400).send({ error: getErrorMessage(error) });
    }
  }

  async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const dto: CreateCommentDto = plainToClass(CreateCommentDto, req.body);
      const result = await this.commentsService.addComment(dto);

      return res.status(201).json(result);

    } catch (error) {
      return res.status(400).send({ error: getErrorMessage(error) });
    }
  }

  async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const [commentId] = req.query.params as Array<string>;
      if (!commentId) return res.status(400).json({ error: "Comment id is required." });

      const dto: UpdateCommentDto = plainToClass(UpdateCommentDto, req.body);
      const result = await this.commentsService.updateComment(commentId, dto);

      return res.status(200).json(result);

    } catch (error) {
      return res.status(400).send({ error: getErrorMessage(error) });
    }
  }

  async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const [commentId] = req.query.params as Array<string>;
      if (!commentId) return res.status(400).json({ error: "Comment id is required." });

      const result = await this.commentsService.deleteComment(commentId);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: getErrorMessage(error) });
    }
  }

  notfound(req: NextApiRequest, res: NextApiResponse) {
    return res.status(404).send({});
  }
}
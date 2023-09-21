import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { NextApiRequest, NextApiResponse } from "next";
import { CommentsService } from "./comments.service";
import { CreateCommentDto, FindCommentsDto, UpdateCommentDto } from "./dtos";

@Service()
export class CommentsController {
  constructor(
    private commentsService: CommentsService
  ) { }

  async find(req: NextApiRequest, res: NextApiResponse) {
    try {
      const dto: FindCommentsDto = plainToClass(FindCommentsDto, req.body);
      const comments = await this.commentsService.getCommentsOfItem(dto, { limit: 10, offset: 0 });

      return res.status(200).json(comments);

    } catch (error) {
      // @ts-ignore
      return res.status(400).send({ error: error.message });
    }
  }

  async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const dto: CreateCommentDto = plainToClass(CreateCommentDto, req.body);
      const result = await this.commentsService.addComment(dto);

      return res.status(201).json(result);

    } catch (error) {
      // @ts-ignore
      return res.status(400).send({ error: error.message });
    }
  }

  async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const commentId = req.query.id && req.query.id as string;
      if (!commentId) return res.status(400).json({ error: "Comment id is required." });

      const dto: UpdateCommentDto = plainToClass(UpdateCommentDto, req.body);
      const result = await this.commentsService.updateComment(commentId, dto);

      return res.status(200).json(result);

    } catch (error) {
      // @ts-ignore
      return res.status(400).send({ error: error.message });
    }
  }

  async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const commentId = req.query.id && req.query.id as string;
      if (!commentId) return res.status(400).json({ error: "Comment id is required." });

      return this.commentsService.deleteComment(commentId);
    } catch (error) {
      // @ts-ignore
      return res.status(400).json({ error: error.message });
    }
  }

  notfound(req: NextApiRequest, res: NextApiResponse) {
    return res.status(404).send({});
  }
}
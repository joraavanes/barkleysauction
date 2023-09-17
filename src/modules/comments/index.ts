import Container from "typedi";
import { CommentsController } from "./comments.controller";
import { routeMapper } from './routeMapper';

const commentscontroller = Container.get(CommentsController);

export {
  commentscontroller,
  routeMapper
}
import { useEffect } from "react";
import { getComments } from "../getComments";
import { useComment } from "./Comment";

export interface CommentType {
  username: string;
  content: string;
  date: Date;
}

export interface CommentListProps {
  comments?: Comment[];
  children?: JSX.Element | JSX.Element[];
}

export const CommentList: React.FC<CommentListProps> = () => {
  const { state, setState } = useComment();
  const { comments } = state;

  if (!comments) return <>No comments</>;

  useEffect(() => {
    getComments().then(
      (comments) => setState({ comments, status: "success" }),
      (error) => setState({ comments: [], status: "fail", error })
    );

    return () => {};
  });

  return (
    <>
      {comments.length
        ? comments.map((comment) => {
            return (
              <li key={Math.round(Math.random() * 1000)}>
                {comment.username} - {comment.date.toUTCString()}
                <p>{comment.content}</p>
              </li>
            );
          })
        : null}
    </>
  );
};

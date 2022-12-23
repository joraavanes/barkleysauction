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

  useEffect(() => {
    setState({ status: "pending" });
    getComments().then(
      (comments) => setState({ comments, status: "success" }),
      (error) => setState({ status: "fail", error })
    );

    return () => {};
  }, []);

  if (!comments || !comments.length) return null;

  return (
    <>
      {comments && comments.length
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

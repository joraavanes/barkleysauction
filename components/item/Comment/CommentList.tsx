import { useEffect } from "react";
import { Status, useComment } from "./Comment";
import useQuery from "@/hooks/useQuery";

export type CommentType = {
  user: string;
  username: string;
  content: string;
  createdAt: Date;
};

export type CommentListProps = {
  comments?: Comment[];
  children?: JSX.Element | JSX.Element[];
};

export const CommentList: React.FC<CommentListProps> = () => {
  const [state, dispatch] = useComment();
  const { comments, itemId } = state;
  const { data, isLoading, isError } = useQuery(
    `/api/comments/${itemId}`,
    `comments/${itemId}`,
    {
      timeout: 5000,
      ContentType: "application/json",
    }
  );

  useEffect(() => {
    if (isLoading) dispatch({ type: Status.pending });

    return () => {};
  }, []);

  useEffect(() => {
    dispatch({ type: Status.success, comments: data as CommentType[] });
  }, [data]);

  useEffect(() => {}, [isError]);

  return (
    <>
      <h2>Comments</h2>
      {comments && comments.length
        ? comments.map((comment) => {
            return (
              <li key={Math.round(Math.random() * 1000)}>
                {comment.username} - {comment.createdAt.toString()}
                <p>{comment.content}</p>
              </li>
            );
          })
        : null}
    </>
  );
};

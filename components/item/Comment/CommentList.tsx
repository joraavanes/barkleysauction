import { useEffect } from "react";
import { Status, useComment } from "./Comment";
import useQuery from "@/hooks/useQuery";
import Spinner from "@/components/shared/Spinner";
import CommentView from "./CommentView";

export type CommentType = {
  _id: string;
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
    dispatch({ type: Status.success, comments: data as CommentType[] });
  }, [data, dispatch]);

  useEffect(() => {}, [isError]);

  return (
    <>
      <h2>Comments</h2>
      {isLoading && <Spinner />}
      {comments && comments.length ? (
        <ul>
          {comments.map((comment) => (
            <CommentView key={comment._id} comment={comment} />
          ))}
        </ul>
      ) : null}
    </>
  );
};

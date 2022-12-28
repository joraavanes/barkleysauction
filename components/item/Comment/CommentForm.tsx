import React, { FormEvent, useState } from "react";
import { postComment } from "../getComments";
import { Status, useComment } from "./Comment";

export const CommentForm: React.FC = () => {
  const [{ status }, dispatch] = useComment();
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch({ type: Status.pending });
    postComment(comment).then(
      (comments) => {
        dispatch({ type: Status.success, comments });
        setComment("");
      },
      (error) => dispatch({ type: Status.error, error })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={status === Status.pending}
      ></textarea>
      <button disabled={status === Status.pending}>Post</button>
    </form>
  );
};

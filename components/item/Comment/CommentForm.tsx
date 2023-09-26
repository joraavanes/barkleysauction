import React, { FormEvent, useState } from "react";
import { postComment } from "../getComments";
import { Status, useComment } from "./Comment";

export const CommentForm: React.FC = () => {
  const [{ status }, dispatch] = useComment();
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!comment) {
      dispatch({
        type: Status.error,
        error: "Comment is empty. Please enter some!",
      });
      return;
    }

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
    <div className="row">
      <div className="col-12 col-lg-8 mt-3 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row gx-1 gy-1">
            <div className="col-12 col-lg-11">
              <textarea
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={status === Status.pending}
                placeholder="Post your comment here ..."
              ></textarea>
            </div>
            <div className="col-12 col-lg-1">
              <button
                className="btn btn-primary"
                disabled={status === Status.pending || !comment.length}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

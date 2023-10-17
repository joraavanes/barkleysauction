import React, { FormEvent, useEffect, useState } from "react";
import { Status, useComment } from "./Comment";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/pages/_app";
import getErrorMessage from "@/shared/utility/resolveErrorMessage";

export const CommentForm: React.FC = () => {
  const [{ status, itemId }, dispatch] = useComment();
  const [comment, setComment] = useState("");

  const {
    error,
    mutate,
    status: mutationStatus,
  } = useMutation({
    mutationFn: async (body: any) => {
      const response = await fetch("/api/comments", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201)
        throw new Error("Failed to post the comment");

      return response.json();
    },
  });

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
    mutate({
      user: "63510298c6f3a606c53f8e69",
      item: itemId,
      content: comment,
    });
  };

  useEffect(() => {
    if (mutationStatus === "success") {
      dispatch({ type: Status.success });
      setComment("");
      queryClient.invalidateQueries({ queryKey: [`comments/${itemId}`] });
    }

    if (mutationStatus === "error") {
      dispatch({ type: Status.error, error: getErrorMessage(error) });
    }
  }, [mutationStatus, dispatch, error, itemId]);

  return (
    <div className="row">
      <div className="col-12 col-lg-8 mt-3 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row gx-1 gy-1">
            <div className="col-12 col-lg-10">
              <textarea
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={status === Status.pending}
                placeholder="Post your comment here ..."
              ></textarea>
            </div>
            <div className="col-12 col-lg-2">
              <button
                className="btn btn-primary"
                disabled={status === Status.pending || !comment.length}
              >
                {mutationStatus === "loading" ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                ) : null}{" "}
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

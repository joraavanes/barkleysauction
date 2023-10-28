import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { CommentType } from "./CommentList";

const CommentView: React.FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <li
      key={Math.round(Math.random() * 10000)}
      role="listitem"
      className="list-item list-unstyled"
    >
      <div className="row mt-3 mb-3">
        <div className="col-2 col-sm-3 col-md-2 col-lg-1 ms-lg-4">
          <Avatar
            {...genConfig()}
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />
        </div>
        <div className="col-10 col-sm-9 col-md-10 col-lg-10 col-lg-10">
          <h6 className="h5">{comment.username} says:</h6>
          <p>{comment.content}</p>
        </div>
      </div>
    </li>
  );
};

export default CommentView;

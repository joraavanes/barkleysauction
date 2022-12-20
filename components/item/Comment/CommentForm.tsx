import React, { FormEvent } from "react";

export const CommentForm: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea></textarea>
      <button>Post</button>
    </form>
  );
};

import { Status, useComment } from "./Comment";

export const CommentStatus: React.FC = () => {
  const [state] = useComment();
  const { status, error } = state;

  if (status === Status.pending)
    return (
      <div
        className="spinner-border spinner-border-sm text-primary"
        role="status"
      >
        <span className="sr-only" role="loading"></span>
      </div>
    );

  if (status === Status.error)
    return (
      <div role="alert" className="primary-pink mb-3 ps-2">
        {error}
      </div>
    );

  return null;
};

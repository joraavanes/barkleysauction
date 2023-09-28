import { Status, useComment } from "./Comment";

export const CommentStatus: React.FC = () => {
  const [state] = useComment();
  const { status, error } = state;

  if (status === Status.pending)
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only" role="loading"></span>
      </div>
    );

  if (status === Status.error) return <div role="alert">{error}</div>;

  return null;
};

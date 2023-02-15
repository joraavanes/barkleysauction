import { Status, useComment } from "./Comment";

export const CommentStatus: React.FC = () => {
  const [state] = useComment();
  const { status, error } = state;

  if (status === Status.pending) return <>loading</>;
  if (status === Status.error) return <div role="alert">{error}</div>;

  return <>{Status[status]}</>;
};

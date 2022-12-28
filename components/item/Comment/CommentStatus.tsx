import { Status, useComment } from "./Comment";

export const CommentStatus: React.FC = () => {
  const [state] = useComment();
  const { status } = state;

  if (status === Status.pending) return <>loading</>;
  if (status === Status.error) return <>Error</>;

  return <>{Status[status]}</>;
};

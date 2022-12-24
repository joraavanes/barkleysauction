import { useComment } from "./Comment";

export const CommentStatus: React.FC = () => {
  const { state } = useComment();
  const { status } = state;

  const isPending = status === "pending";
  const isError = status === "fail";

  if (isPending) return <>loading</>;
  if (isError) return <>Error</>;

  return <>{status}</>;
};

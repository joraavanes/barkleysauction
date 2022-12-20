interface CommentStatus {
  status: string;
}

export const CommentStatus: React.FC<CommentStatus> = ({ status }) => {
  const isPending = status === "pending";
  const isError = status === "fail";

  if (isPending) return <>loading</>;
  if(isError) return <>Error</>

  return <>Successful</>
};

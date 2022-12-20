interface Comment {
  username: string;
  content: string;
  date: Date;
}

interface CommentListProps {
  comments?: Comment[];
  children?: JSX.Element | JSX.Element[];
}

const DUMMY_COMMENTS: Comment[] = [
  {
    username: "Fred",
    content: "Hey there! This is cool",
    date: new Date(),
  },
  {
    username: "Fred",
    content: "Hey there! This is cool",
    date: new Date(),
  },
  {
    username: "Fred",
    content: "Hey there! This is cool",
    date: new Date(),
  },
  {
    username: "Fred",
    content: "Hey there! This is cool",
    date: new Date(),
  },
  {
    username: "Fred",
    content: "Hey there! This is cool",
    date: new Date(),
  },
];

export const CommentList: React.FC<CommentListProps> = ({
  comments = DUMMY_COMMENTS,
}) => {
  if (!comments) return <>No comments</>;

  return (
    <>
      {comments.length
        ? comments.map((comment) => {
            return (
              <li key={Math.round(Math.random() * 1000)}>
                {comment.username} - {comment.date.toUTCString()}
                <p>{comment.content}</p>
              </li>
            );
          })
        : null}
    </>
  );
};

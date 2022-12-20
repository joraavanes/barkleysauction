
interface CommentProps {
    children?: JSX.Element | JSX.Element[]
}

export const Comment: React.FC<CommentProps> = ({ children }) => {
  return <>{children}</>;
};

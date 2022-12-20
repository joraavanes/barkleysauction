import { createContext, useContext, useState } from "react";
import { CommentType } from "./CommentList";

interface CommentProps {
  children?: JSX.Element | JSX.Element[];
}

interface CommentState {
  comments?: CommentType[];
  status: string;
  error?: string;
}

interface CommentContextType {
  state: CommentState;
  setState: (state: CommentState) => void;
}

const commentContext = createContext<CommentContextType | null>(null);

export const Comment: React.FC<CommentProps> = ({ children }) => {
  const [state, setState] = useState<CommentState>({
    comments: [],
    status: "idle",
  });

  return (
    <commentContext.Provider value={{ state, setState }}>
      {children}
    </commentContext.Provider>
  );
};

export const useComment = () => {
  const value = useContext(commentContext);
  if (!value) throw new Error("Component must be within provider");
  return value;
};

import {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useState,
} from "react";
import { CommentType } from "./CommentList";

interface CommentProps {
  children?: JSX.Element | JSX.Element[];
}

interface CommentState {
  comments?: CommentType[];
  status: Status;
  error?: string;
}

type CommentContextType = [state: CommentState, dispatch: Dispatch<Action>];

export enum Status {
  idle,
  pending,
  success,
  error,
}

interface Action {
  type: Status;
  comments?: CommentType[];
  error?: string;
}

function commentReducer(state: CommentState, action: Action): CommentState {
  switch (action.type) {
    case Status.success:
      return {
        ...state,
        comments: action.comments ? action.comments : state.comments,
        status: Status.success,
      };
    case Status.pending:
      return {
        ...state,
        status: Status.pending,
      };
    case Status.idle:
      return {
        status: Status.idle,
      };
    case Status.error:
      return {
        status: Status.error,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const CommentContext = createContext<CommentContextType | null>(null);

export const Comment: React.FC<CommentProps> = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, {
    comments: [],
    status: Status.idle,
  });

  return (
    <CommentContext.Provider value={[state, dispatch]}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  const value = useContext(CommentContext);
  if (!value) throw new Error("Component must be within provider");
  return value;
};

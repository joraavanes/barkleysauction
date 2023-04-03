import { Status, useBid } from "./Bid";

interface Props {
  children?: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children }) => {
  const { state } = useBid();
  const { status } = state;
  return (
    <button disabled={status === Status.pending}>
      {status === Status.pending ? "loading" : children}
    </button>
  );
};

import { Status } from "@/shared/types";
import { useBid } from "./Bid";

interface Props {
  children?: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children }) => {
  const { state } = useBid();
  const { status } = state;
  return (
    <button disabled={status === Status.loading}>
      {status === Status.loading ? "loading" : children}
    </button>
  );
};

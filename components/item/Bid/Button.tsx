import { Status } from "@/shared/types";
import { useBid } from "./Bid";
import styles from "./styles/Bid.module.css";

type Props = {
  children?: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children }) => {
  const { state } = useBid();
  const { status } = state;
  return (
    <button
      className={`btn btn-primary ${styles.bidSubmitBtn}`}
      disabled={status === Status.loading}
      role="button"
    >
      {status === Status.loading ? "loading" : children}
    </button>
  );
};

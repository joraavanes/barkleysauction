import { Status } from "@/shared/types";
import { useItem } from "./Item";

const ItemStatus: React.FC = () => {
  const { state } = useItem();

  if (state.status == Status.loading) {
    return <span>Loading...</span>;
  }

  if (state.status == Status.error) {
    return <span role="alert">Something went wrong! Try again.</span>;
  }

  if (state.status == Status.success) {
    return <span>Changes successfuly done!</span>;
  }

  return null;
};

export default ItemStatus;

import { useEffect } from "react";
import { Item, Status, useItem } from "./Item";
import ItemForm from "./ItemForm";
import useMutate from "../../hooks/useMutate";

const CreateItem: React.FC = () => {
  const { state, setstate } = useItem();

  const {
    state: { status, isError, isSuccess, isLoading, errorMessage, body },
    mutate,
  } = useMutate<Item>("/api/items", {
    method: "POST",
    body: state.item,
    timeout: 10000,
  });

  useEffect(() => {
    status === "loading"
      ? setstate((prev) => ({ ...prev, status: Status.loading }))
      : null;

    if (status === "success") {
      setstate((prev) => ({
        ...prev,
        status: Status.success,
        item: {
          title: "",
          description: "",
          startingBid: 0,
          UserId: "",
        },
      }));
    }

    if (status === "error") {
      setstate((prev) => ({
        ...prev,
        status: Status.error,
        error: errorMessage,
      }));
    }
  }, [status]);

  return (
    <>
      <ItemForm mutate={mutate} />
    </>
  );
};

export default CreateItem;

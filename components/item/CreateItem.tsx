import { useEffect } from "react";
import { Item, useItem } from "./Item";
import ItemForm from "./ItemForm";
import useMutate from "@/hooks/useMutate";
import { Status } from "@/shared/types";

const CreateItem: React.FC = () => {
  const { state, setState } = useItem();

  const {
    state: { status, errorMessage, responseBody },
    mutate,
  } = useMutate("/api/items", {
    method: "POST",
    timeout: 5000,
  });

  useEffect(() => {
    status === Status.loading
      ? setState((prev) => ({ ...prev, status: Status.loading }))
      : null;

    if (status === Status.success) {
      setState((prev) => ({
        ...prev,
        status: Status.success,
        item: {
          title: "",
          description: "",
          startingBid: "0",
          image: null,
          UserId: "63510298c6f3a606c53f8e69",
        },
      }));
    }

    if (status === Status.error) {
      setState((prev) => ({
        ...prev,
        status: Status.error,
        error: errorMessage,
      }));
    }
  }, [status, errorMessage, setState]);

  return (
    <>
      <ItemForm mutate={mutate} />
    </>
  );
};

export default CreateItem;

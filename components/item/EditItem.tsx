import { useEffect } from "react";
import useMutate from "@/hooks/useMutate";
import ItemForm from "./ItemForm";
import { useItem } from "./Item";
import { Item } from "@/shared/types/Item";

type Props = {
  id?: string;
  item: Item;
};

const EditItem: React.FC<Props> = ({ id, item }) => {
  const { setState } = useItem();

  const {
    mutate,
    state: { status },
  } = useMutate(`/api/items/${id}`, {
    method: "PATCH",
    timeout: 5000,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      item: item ? { ...item } : prev.item,
    }));
  }, [item, setState]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      status,
    }));
  }, [status, setState]);

  return <ItemForm mutate={mutate} />;
};

export default EditItem;

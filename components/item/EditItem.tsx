import { useEffect } from "react";
import useMutate from "@/hooks/useMutate";
import ItemForm from "./ItemForm";
import { Item, useItem } from "./Item";

type Props = {
  id?: string;
  item: Item;
};

const EditItem: React.FC<Props> = ({ id, item }) => {
  const { setstate } = useItem();

  const {
    mutate,
    state: { status },
  } = useMutate(`/api/items/${id}`, {
    method: "PATCH",
    timeout: 5000,
  });

  useEffect(() => {
    setstate((prev) => ({
      ...prev,
      item: item ? { ...item } : prev.item,
    }));
  }, [item]);

  useEffect(() => {
    setstate((prev) => ({
      ...prev,
      status,
    }));
  }, [status]);

  return <ItemForm mutate={mutate} />;
};

export default EditItem;

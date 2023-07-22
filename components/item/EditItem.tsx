import { useEffect } from "react";
import ItemForm from "./ItemForm";
import { Item, useItem } from "./Item";
import useMutate from "../../hooks/useMutate";

type Props = {
  id?: string;
  item: Item;
};

const EditItem: React.FC<Props> = ({ id, item }) => {
  const { state, setstate } = useItem();

  const { mutate } = useMutate(`/api/items/${id}`, {
    method: "PATCH",
    timeout: 5000,
  });

  useEffect(() => {
    setstate((prev) => ({
      ...prev,
      item: item ? { ...item } : prev.item,
    }));
  }, [item]);

  return <ItemForm mutate={mutate} />;
};

export default EditItem;

import { useEffect } from "react";
import ItemForm from "./ItemForm";
import { Item, useItem } from "./Item";
import useMutate from "../../hooks/useMutate";

const EditItem: React.FC<{ id?: number; item: Partial<Item> }> = ({
  id,
  item,
}) => {
  const { state, setstate } = useItem();

  const { mutate } = useMutate(`/items/${id}`, {
    method: "PATCH",
    body: state.item,
    timeout: 5000,
  });

  useEffect(() => {
    setstate((prev) => ({
      ...prev,
      item: item ? { ...prev.item, ...item } : prev.item,
    }));
  }, [item]);

  return <ItemForm mutate={mutate} />;
};

export default EditItem;

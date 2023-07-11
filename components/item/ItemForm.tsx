import { ChangeEvent, FormEvent } from "react";
import { ItemState, Status, useItem } from "./Item";

type Item = {
  title: string;
  description: string;
  startingBid: number;
  UserId: string;
  itemId?: string;
};

type Props = {
  mutate: (item: Item) => void;
  item?: Item;
};

const ItemForm: React.FC<Props> = (props) => {
  const { state, setstate } = useItem();

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();

    props.mutate(state.item);
  };

  return (
    <form onSubmit={handleCreateSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={state.item.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setstate((prev: ItemState) => ({
              ...prev,
              item: { ...prev.item, title: e.target.value },
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={state.item.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setstate((prev) => ({
              ...prev,
              item: { ...prev.item, description: e.target.value },
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="startingBid">Starting bid</label>
        <input
          type="number"
          name="startingBid"
          id="startingBid"
          step={0.01}
          value={state.item.startingBid}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setstate((prev) => ({
              ...prev,
              item: { ...prev.item, startingBid: e.target.valueAsNumber },
            }))
          }
        />
      </div>
      <div>
        <button type="submit" disabled={state.status === Status.loading}>
          {state.status === Status.loading ? "Loading ..." : "Add item"}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;

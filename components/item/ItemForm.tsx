import { ChangeEvent, FormEvent } from "react";
import { ItemState, useItem } from "./Item";
import { Item } from "@/shared/types/Item";
import { Status } from "@/shared/types";

type Props = {
  mutate: (item: Item) => void;
};

const ItemForm: React.FC<Props> = (props) => {
  const { state, setState } = useItem();

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();

    props.mutate(state.item);
  };

  return (
    <form onSubmit={handleCreateSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={state.item.title}
          className="form-control"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setState((prev: ItemState) => ({
              ...prev,
              item: { ...prev.item, title: e.target.value },
            }))
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={state.item.description}
          className="form-control"
          cols={10}
          rows={5}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setState((prev) => ({
              ...prev,
              item: { ...prev.item, description: e.target.value },
            }))
          }
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="startingBid">Starting bid</label>
        <input
          type="number"
          name="startingBid"
          id="startingBid"
          step={0.01}
          value={state.item.startingBid}
          className="form-control"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setState((prev) => ({
              ...prev,
              item: { ...prev.item, startingBid: e.target.value },
            }))
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={({ target }) => {
            const file =
              target.files && target.files.item(0)
                ? target.files.item(0)
                : null;

            setState((prev) => ({
              ...prev,
              item: { ...prev.item, image: file },
            }));
          }}
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={state.status === Status.loading}
          className="btn btn-primary"
        >
          {state.status === Status.loading ? "Loading ..." : "Add item"}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;

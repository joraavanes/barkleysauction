import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

type newItem = {
  title: string;
  description: string;
};

const CreateItem: React.FC = () => {
  const [state, setstate] = useState({
    title: "",
    description: "",
    UserId: "5dff47919cbd8418e424c33e",
  });

  const mutation = useMutation({
    mutationFn: (newItem: newItem) => {
      return fetch("/api/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    },
    onSuccess: (data, variables, context) => {
      setstate((prev) => ({
        ...prev,
        title: "",
        description: "",
        startingBid: 0,
      }));
    },
  });

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutation.mutate(state);
  };

  return (
    <form onSubmit={handleCreateSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={state.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setstate((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={state.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setstate((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>
      <div>
        <button type="submit">Add Item</button>
      </div>
    </form>
  );
};

export default CreateItem;

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useMutate from "../../hooks/useMutate";

type Item = {
  title: string;
  description: string;
  UserId: string;
};

const CreateItem: React.FC = () => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    UserId: "6350f85dc6f3a606c53f8e66",
  });

  const {
    state: { status, isError, isSuccess, isLoading, errorMessage, body },
    mutate,
  } = useMutate<Item>("/api/items", {
    method: "POST",
    body: item,
    timeout: 5000,
  });

  useEffect(() => {
    if (status === "success")
      setItem((prev) => ({ ...prev, title: "", description: "" }));
  }, [status]);

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate(item);
  };

  return (
    <form onSubmit={handleCreateSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={item.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setItem((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={item.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setItem((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>
      <div>
        <button type="submit" disabled={status === "loading"}>
          {status === "loading"
            ? "Loading ..."
            : isError
            ? "Failed!"
            : "Add Item"}
        </button>
        {isLoading ? <p>Loading...</p> : null}
        {errorMessage ? <p>{errorMessage}</p> : null}
        {JSON.stringify(body, undefined, 3)}
      </div>
    </form>
  );
};

export default CreateItem;

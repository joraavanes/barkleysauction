import React, { useEffect, useState } from "react";
import GridRow from "./GridRow";

interface Grid<T> {
  url: string;
  renderItem?: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

interface GridState<T> {
  status: "idle" | "pending" | "success" | "error";
  rows?: Array<T>;
  error?: any;
}

const Grid = <T extends object>({ url, renderItem, keyExtractor }: Grid<T>) => {
  const [state, setState] = useState<GridState<T>>({
    rows: [],
    status: "idle",
    error: null,
  });
  const { rows, status, error } = state;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data: Array<T>) => setState({ rows: data, status: "success" }),
        (error: Error) => setState({ status: "error", error })
      );

    return () => {};
  }, [url]);

  if (status === "idle" || status === "pending") {
    return <span>Loading ...</span>;
  }

  if (status === "error") {
    return <span>Failed to get data: {error}</span>;
  }

  return (
    <table>
      <thead>
        {rows?.length ? (
          Object.keys(rows[0]).map((key) => (
            <th key={self.crypto.randomUUID()}>{key}</th>
          ))
        ) : (
          <th>Loading ...</th>
        )}
      </thead>
      <tbody>
        {/* {state.rows?.map((item) => (
        <div key={keyExtractor(item)}>
          {renderItem && renderItem(item)}
          <GridRow data={item}/>
        </div>
      ))} */}
        {rows?.map((item) => (
          <GridRow key={keyExtractor(item)} data={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Grid;

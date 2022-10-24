import React, { useEffect, useState } from "react";
import GridRow from "./GridRow";

interface Grid<T> {
  url: string;
  renderItem?: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

interface GridState<T> {
  state: string;
  rows?: Array<T>;
  error?: any;
}

const Grid = <T extends object>({ url, renderItem, keyExtractor }: Grid<T>) => {
  const [state, setState] = useState<GridState<T>>({
    rows: [],
    state: "idle",
    error: null,
  });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data: Array<T>) => setState({ rows: data, state: "" }),
        (error: Error) => setState({ state: "rejected", error })
      );

    return () => {};
  }, []);

  return (
    <table>
      <thead></thead>
      <tbody>
        {/* {state.rows?.map((item) => (
        <div key={keyExtractor(item)}>
          {renderItem && renderItem(item)}
          <GridRow data={item}/>
        </div>
      ))} */}
        {state.rows?.map((item) => (
          <GridRow key={keyExtractor(item)} data={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Grid;

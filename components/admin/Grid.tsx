import React from "react";
import GridRow from "./GridRow";
import useQuery from "@/hooks/useQuery";

type Grid<T> = {
  url: string;
  renderItem?: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  columns: Array<keyof T>;
};

type GridState<T> = {
  status: "idle" | "pending" | "success" | "error";
  rows?: Array<T>;
  error?: any;
};

const Grid = <T extends { _id: any }>({
  url,
  keyExtractor,
  columns,
}: Grid<T>) => {
  const { data: rows, status } = useQuery<Array<T>>(url, url, {
    timeout: 5000,
  });

  if (status === "loading") {
    return <span>Loading ...</span>;
  }

  if (status === "error") {
    return <span>Failed to get data</span>;
  }

  return (
    rows && (
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={self.crypto.randomUUID()}>{column.toString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => (
            <GridRow<T>
              api={url}
              key={keyExtractor(item)}
              data={item}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    )
  );
};

export default Grid;

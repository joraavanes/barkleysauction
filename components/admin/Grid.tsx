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
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={self.crypto.randomUUID()} scope="col">
                {column.toString()}
              </th>
            ))}
            <th scope="col" style={{ width: 200 }}>
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          {rows &&
            rows.map((item) => (
              <GridRow<T>
                api={url}
                key={keyExtractor(item)}
                data={item}
                columns={columns}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import GridRow from "./GridRow";
import useQuery from "@/hooks/useQuery";
import Spinner from "../shared/Spinner";

type Grid<T> = {
  url: string;
  renderItem?: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  columns: Array<keyof T>;
};

const Grid = <T extends { _id: any }>({
  url,
  keyExtractor,
  columns,
}: Grid<T>) => {
  /* Create an object state using columns as keys with values of empty strings */
  const [filterInputs, setFilterInputs] = useState(
    Object.fromEntries(columns.map((k) => [k, ""]))
  );

  /* Create an object of ref, referring to text filter inputs */
  // const filterInputsRef = useRef(
  //   Object.fromEntries(columns.map((k) => [k, false]))
  // );

  /* Create URL object for calling the endpoint */
  const endpoint = new URL(url);
  for (const filter in filterInputs) {
    if (filterInputs[filter] !== "")
      endpoint.searchParams.set(filter, filterInputs[filter]);
  }

  const {
    data: rows,
    status,
    isLoading,
  } = useQuery<Array<T>>(
    endpoint.href,
    ["grid", ...Object.values(filterInputs)],
    {
      timeout: 5000,
    }
  );

  // if (status === "loading") {
  //   return <span>Loading ...</span>;
  // }

  if (status === "error") {
    return <span>Failed to get data</span>;
  }

  const hanldeFilterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // for(const filter in filterInputs)
    //   filterInputsRef.current[filter] = false;

    // filterInputsRef.current[e.target.id] = true;
  };

  return (
    <div className="table-responsive-sm">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.toString()} scope="col">
                {column.toString()}
              </th>
            ))}
            <th scope="col" style={{ width: 200 }}>
              &nbsp;
            </th>
          </tr>
          <tr>
            {Object.entries(filterInputs).map(([key, value]) => (
              <th key={key.toString()}>
                <input
                  type="text"
                  name={key.toString()}
                  id={key.toString()}
                  className="form-control"
                  autoComplete="off"
                  value={filterInputs[key]}
                  // autoFocus={filterInputsRef.current[key]}
                  placeholder={key.toString()}
                  onChange={hanldeFilterInputChange}
                />
              </th>
            ))}
            <th scope="col" style={{ width: 200 }}>
              {isLoading ? <Spinner /> : null}
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

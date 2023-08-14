import Link from "next/link";

type GridRow<T> = {
  data: T;
  columns: Array<keyof T>;
  api: string;
};

const GridRow = <T extends { _id: any }>({
  data,
  columns,
  api,
}: GridRow<T>) => {
  return (
    <tr>
      {columns.map((column: keyof T, index: number) => (
        <td key={`${data[column]}${index}`}>{`${data[column]}`}</td>
      ))}
      <td>
        <Link
          href={`${api.replace("/api", "")}/edit/${data["_id"].toString()}`}
        >
          <a className="btn btn-primary m-1 m-1">Edit</a>
        </Link>

        <Link href={`${api}/${data["_id"]}`}>
          <span className="btn btn-secondary m-1 m-1">Delete</span>
        </Link>
      </td>
    </tr>
  );
};

export default GridRow;

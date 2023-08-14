interface GridRow<T> {
  data: T;
  columns: Array<keyof T>;
}

const GridRow = <T extends {}>({ data, columns }: GridRow<T>) => {
  return (
    <tr>
      {columns.map((column: keyof T, index: number) => (
        <td key={`${data[column]}${index}`}>{`${data[column]}`}</td>
      ))}
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default GridRow;

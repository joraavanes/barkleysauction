import React from 'react'

interface GridRow<T> {
  data: T;
}

const GridRow = <T extends object>({data}: GridRow<T>) => {
  return (
    <tr>
      {Object.values(data).map(value => (
        <td key={value}>{value}</td>
      ))}
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  )
}

export default GridRow;
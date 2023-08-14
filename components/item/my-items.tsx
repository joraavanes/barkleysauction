import React from "react";
import Link from 'next/link';
import { Item } from "@/src/modules/items/item.model";

const MyItems: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <>
      <h1>My items</h1>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id.toString()}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <Link href={`/items/edit/${item._id}`}>Edit</Link>
              </td>
              <td>
                |{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    fetch(`/api/items/${item._id.toString()}`, {
                      method: "DELETE",
                    }).then(console.log);
                  }}
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MyItems;

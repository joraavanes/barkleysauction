import { GetStaticProps } from "next";
import Link from "next/link";
import { itemsService } from "../../src/modules/items";
import { NextPageWithLayout } from "../_app";
import { Item } from "../../src/modules/items/item.model";

export const getStaticProps: GetStaticProps = async () => {
  const items = await itemsService.getItems();

  return {
    props: {
      items: items.map((item) => ({
        _id: item._id.toString(),
        title: item.title,
        description: item.description,
      })),
    },
  };
};

const MyItemsPage: NextPageWithLayout<{ items: Item[] }> = ({ items }) => {
  return (
    <>
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
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={"/items/edit/64aa78b4939ebe2422cf1ad4"}>Edit item</Link>
    </>
  );
};

export default MyItemsPage;

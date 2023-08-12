import { GetServerSideProps } from "next";
import Link from "next/link";
import { itemsService } from "../../src/modules/items";
import { NextPageWithLayout } from "../_app";
import { Item } from "../../src/modules/items/item.model";

export const getServerSideProps: GetServerSideProps = async () => {
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

export default MyItemsPage;

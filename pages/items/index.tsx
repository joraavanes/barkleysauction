import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { itemsService } from "../../src/modules/items";
import type { NextPageWithLayout } from "../_app";

interface IndexProps {
  items: Array<{
    _id: string;
    title: string;
    description: string;
    imageUrl: number;
  }>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const _items = await itemsService.getItems();
  const items = _items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    owner: item.owner?.toString() ?? "",
  }));

  return {
    props: {
      items,
    },
    revalidate: 120,
  };
};

const Index: NextPageWithLayout<IndexProps> = ({ items }) => {
  return (
    <div>
      <Head>
        <title>Current Listed Items</title>
      </Head>
      <h2>Index</h2>
      <pre>
        {/* {JSON.stringify(items)} */}
        {items.map((item) => (
          <div key={item._id.toString()}>
            <h2>
              {item.title} - {item._id}
            </h2>
            <p>{item.description}</p>
            <p>{item.imageUrl}</p>
            <Link
              href={`/items/${item._id}/${item.title.replaceAll(" ", "-")}`}
            >
              <a>Check out</a>
            </Link>
          </div>
        ))}
      </pre>
    </div>
  );
};

// Return page component with a specific layout
// Index.getLayout = function getLayout(page: ReactElement){
//   return page;
// }

export default Index;

import React from "react";
import { GetStaticProps } from "next";
import { itemsService } from "../../src/modules/items";
import Head from "next/head";

interface IndexProps {
  items: Array<{ _id: string; title: string; description: string; imageUrl: number }>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const _items = await itemsService.getItems();
  const items = _items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    owner: item.owner?.toString() ?? ''
  }));

  return {
    props: {
      items,
    },
  };
};

const Index: React.FC<IndexProps> = ({ items }) => {
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
            <h2>{item.title} - {item._id}</h2>
            <p>{item.description}</p>
            <p>{item.imageUrl}</p>
          </div>
        ))}
      </pre>
    </div>
  );
};

export default Index;

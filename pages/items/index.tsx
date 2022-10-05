import React from "react";
import { GetStaticProps } from "next";
import { itemsService } from "../../src/modules/items";
import Head from "next/head";

interface IndexProps {
  items: Array<{ id: number; title: string; price: number }>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const items = itemsService.getItems();
  console.log(items);

  return {
    props: {
      items,
    },
  };
};

const Index: React.FC<IndexProps> = ({ items }) => {
  return <div>
    <Head>
      <title>Current Listed Items</title>
    </Head>
    <h2>Index</h2>
    <pre>
        {JSON.stringify(items)}
        {items.map(item => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.price}</p>
          </div>
        ))}
    </pre>
  </div>;
};

export default Index;

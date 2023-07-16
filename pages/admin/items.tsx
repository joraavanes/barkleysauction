import Head from "next/head";
import React from "react";
import Grid from "../../components/admin/Grid";

interface Item {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const ItemsAdmin = () => {
  return (
    <>
      <Head>
        <title>Barkleys Auction | Items</title>
      </Head>
      <h1>ItemsAdmin</h1>
      <Grid<Item>
        url={"/api/items"}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ title, description, imageUrl }) => (
          <li>
            {title} - {description} - {imageUrl}
          </li>
        )}
      />
    </>
  );
};

export default ItemsAdmin;

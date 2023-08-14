import Head from "next/head";
import React from "react";
import Grid from "../../components/admin/Grid";
import { Item } from "@/src/modules/items/item.model";

const ItemsAdmin = () => {
  return (
    <>
      <Head>
        <title>Barkleys Auction | Items</title>
      </Head>

      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1>ItemsAdmin</h1>
            <Grid<Item>
              url={"/api/items"}
              keyExtractor={(item) => item._id.toString()}
              columns={["title", "description", "imageUrl"]}
              renderItem={({ title, description, imageUrl }) => (
                <li>
                  {title} - {description} - {imageUrl}
                </li>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsAdmin;

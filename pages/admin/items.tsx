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
          <div className="col p-1">
            <h1 className="px-3 mt-4 mb-3">Items&apos; Management</h1>
            <Grid<Item>
              url={`http://localhost:3000/api/items`}
              keyExtractor={(item) => item._id.toString()}
              columns={["title", "description", "imageUrl", "updatedAt"]}
              renderItem={({ title, description, imageUrl, updatedAt }) => (
                <li>
                  {title} - {description} - {imageUrl} -{" "}
                  {updatedAt.toUTCString()}
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

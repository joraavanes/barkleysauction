import { ReactElement } from "react";
import Head from "next/head";
import CreateItem from "@/components/item/CreateItem";
import { Item } from "@/components/item/Item";
import { NextPageWithLayout } from "../_app";
import ItemStatus from "@/components/item/ItemStatus";

const CreateItemPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>Create new item</h1>
      <Item>
        <CreateItem />
        <ItemStatus />
      </Item>
    </>
  );
};

CreateItemPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <main>
      <Head>
        <title>New Item</title>
      </Head>
      {page}
    </main>
  );
};

export default CreateItemPage;

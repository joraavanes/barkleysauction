import { ReactElement, useEffect } from "react";
import Head from "next/head";
import EditItem from "@/components/item/EditItem";
import { Item } from "@/components/item/Item";
import { NextPageWithLayout } from "@/pages/_app";
import ItemStatus from "@/components/item/ItemStatus";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { itemsService } from "../../../src/modules/items";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query?.id as string;
  
  if (id) {
    const item = await itemsService.findById(id);

    return {
      props: {
        item: {
          title: item?.title,
          description: item?.description,
          imageUrl: item?.imageUrl,
          startingBid: item?.bids.length ? item.bids[0] : 0
        },
      },
    };
  }

  return {
    props: {},
  };
};

const EditItemPage: NextPageWithLayout<{ item: any }> = (props) => {
  const router = useRouter();

  const id =
    typeof router.query.id === "string"
      ? parseInt(router?.query?.id)
      : undefined;

  return (
    <>
      <h1>Edit an item with id: {router?.query?.id}</h1>
      <Item>
        <EditItem id={id} item={props.item} />
        <ItemStatus />
      </Item>
    </>
  );
};

EditItemPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <main>
      <Head>
        <title>edit Item</title>
      </Head>
      {page}
    </main>
  );
};

export default EditItemPage;
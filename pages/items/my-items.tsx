import { GetServerSideProps } from "next";
import { NextPageWithLayout } from "../_app";
import { itemsService } from "@/src/modules/items";
import { Item as ItemModel } from "@/src/modules/items/item.model";
import { Item } from "@/components/item/Item";
import MyItems from "@/components/item/my-items";

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await itemsService.getItems({
    limit: Number.MAX_SAFE_INTEGER,
    offset: 0,
  });

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

const MyItemsPage: NextPageWithLayout<{ items: ItemModel[] }> = ({ items }) => {
  return (
    <>
      <Item>
        <MyItems items={items} />
      </Item>
    </>
  );
};

export default MyItemsPage;

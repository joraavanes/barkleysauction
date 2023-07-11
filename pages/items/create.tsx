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

export default CreateItemPage;

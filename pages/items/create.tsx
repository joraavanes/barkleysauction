import CreateItem from "@/components/item/CreateItem";
import { NextPage } from "next";

const CreateItemPage: NextPage = () => {
  return <>
    <h1>Create new item</h1>
    <CreateItem/>
  </>
};

export default CreateItemPage;
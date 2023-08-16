import { ReactElement } from "react";
import Head from "next/head";
import CreateItem from "@/components/item/CreateItem";
import { Item } from "@/components/item/Item";
import { NextPageWithLayout } from "../_app";
import ItemStatus from "@/components/item/ItemStatus";

const CreateItemPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>New Item | Barkleys Auction</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h1>Create new item</h1>
            <Item>
              <CreateItem />
              <ItemStatus />
            </Item>
          </div>
        </div>
      </div>
    </>
  );
};

// CreateItemPage.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <main>
//       <Head>
//         <title>New Item</title>
//       </Head>
//       {page}
//     </main>
//   );
// };

export default CreateItemPage;

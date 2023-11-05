import Head from "next/head";
import { GetStaticProps } from "next";
import { itemsService } from "@/src/modules/items";
import type { NextPageWithLayout } from "../_app";
import { ViewItem } from "@/shared/types/Item";
import ItemCard from "@/components/item/ItemCard";

interface IndexProps {
  items: Array<ViewItem>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const _items = await itemsService.getItems({
    limit: 24,
    offset: 0,
  });
  const items = _items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    owner: item.owner?.toString() ?? "",
  }));

  return {
    props: {
      items,
    },
    revalidate: Number(process.env.REVALIDATION),
  };
};

const Index: NextPageWithLayout<IndexProps> = ({ items }) => {
  return (
    <div>
      <Head>
        <title>Current Listed Items</title>
      </Head>
      <div className="container-fluid">
        <div className="row mt-3 ms-2 me-2 gy-3">
          {items.map((item) => (
            <ItemCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Return page component with a specific layout
// Index.getLayout = function getLayout(page: ReactElement){
//   return page;
// }

export default Index;

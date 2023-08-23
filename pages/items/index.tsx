import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { itemsService } from "../../src/modules/items";
import type { NextPageWithLayout } from "../_app";
import { ViewItem } from "@/shared/types/Item";

interface IndexProps {
  items: Array<ViewItem>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const _items = await itemsService.getItems();
  const items = _items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    owner: item.owner?.toString() ?? "",
  }));

  return {
    props: {
      items,
    },
    revalidate: 1800,
  };
};

const Index: NextPageWithLayout<IndexProps> = ({ items }) => {
  return (
    <div>
      <Head>
        <title>Current Listed Items</title>
      </Head>
      <div className="container-fluid">
        <div className="row mt-3 ms-2 me-2">
          {items.map((item) => (
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <div className="card" key={item._id.toString()}>
                <div className="card-body">
                  <Image
                    src={item.imageUrl}
                    className="img-fluid rounded"
                    width={200}
                    height={200}
                    objectFit="contain"
                    title={item.title}
                  />
                  <h5 className="one-line-ellipsis" title={item.title}>
                    {item.title} - {item._id}
                  </h5>
                  <p className="line-clamp-3">{item.description}</p>
                  <Link
                    href={`/items/${item._id}/${item.title.replaceAll(
                      " ",
                      "-"
                    )}`}
                  >
                    <a className="btn btn-primary">Check out</a>
                  </Link>
                </div>
              </div>
            </div>
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

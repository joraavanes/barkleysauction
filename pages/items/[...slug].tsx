import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { itemsService } from "../../src/modules/items";
import { NextPageWithLayout } from "../_app";
import { Bid, BidInput, LatestBids, BidStatus } from "@/components/item/Bid";
import {
  Comment,
  CommentForm,
  CommentList,
  CommentStatus,
} from "@/components/item/Comment";

interface ItemSlugPageProps {
  item: {
    _id: string;
    title: string;
    description: string;
    bids: Array<number>;
    imageUrl: string;
    owner: string;
  };
}

const ItemSlugPage: NextPageWithLayout<ItemSlugPageProps> = ({ item }) => {
  const router = useRouter();
  const slug = router.query?.slug ?? [];

  const id = slug[0];
  const itemTitle = slug[1];

  return (
    <>
      <Head>
        <title>{`${item.title} | Barkley's Auction`}</title>
        <meta name="description" content={item.description} />
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-8">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3">
                <img src={item.imageUrl} className="img-fluid" />
              </div>
              <div className="col-12 col-md-8 col-lg-9">
                <h1>
                  {item.title}
                  {item.bids?.length ? (
                    <>Last bid for &#36;{Math.max(...item.bids)}</>
                  ) : null}
                </h1>
                <p>{id}</p>
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>

              <div className="col-12 col-sm-6 col-md-8">
                <div>
                  <Comment>
                    <CommentForm />
                    <CommentStatus />
                    <CommentList />
                  </Comment>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <Bid>
              <BidInput />
              <BidStatus />
              <LatestBids />
            </Bid>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug ?? [];

  const id = slug[0];
  const itemTitle = slug[1];

  const _item = await itemsService.findById(id);

  if (!_item) {
    return {
      notFound: true,
    };
  }

  const item = {
    ..._item,
    _id: _item?._id.toString(),
    owner: _item?.owner?.toString() ?? "",
  };

  return {
    props: {
      item,
    },
    revalidate: 1800,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const items = await itemsService.getItems();
  const paths = items.map((item) => ({
    params: {
      id: item._id.toString(),
      slug: [item._id.toString(), item.title.replaceAll(" ", "-")],
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default ItemSlugPage;

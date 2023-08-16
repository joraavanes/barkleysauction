import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Bid, BidInput, BidStatus, LatestBids } from "@/components/item/Bid";
import { itemsService } from "../../src/modules/items";
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

const ItemSlugPage: NextPage<ItemSlugPageProps> = ({ item }) => {
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
              <div className="col-12 col-md-5 col-lg-4">
                <div className="position-relative w-100 mt-3 mb-3">
                  <Image
                    src={item.imageUrl}
                    className="img-fluid rounded"
                    alt={item.title}
                    layout="responsive"
                    width={500}
                    height={500}
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL="/icon.png"
                  />
                </div>
              </div>
              <div className="col-12 col-md-7 col-lg-8">
                <div className="d-block mt-4 mb-3">
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
  const id = context.params?.id;

  // checks the validity of id
  if (!id || !(typeof id === "string")) {
    return {
      notFound: true,
    };
  }

  // catch the item from the database
  const _item = await itemsService.findById(id);

  // returns notFound if no item found
  if (!_item) {
    return {
      notFound: true,
    };
  }

  //Serialize ObjectId props to strings
  const item = {
    ..._item,
    _id: _item?._id.toString(),
    owner: _item?.owner?.toString() ?? "",
  };

  // return the item as props to the component
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
    params: { id: item._id.toString() },
  }));

  return {
    // paths: [{ params: { id: "123" } }, { params: { id: "511" } }],
    paths,
    fallback: "blocking",
  };
};

export default ItemSlugPage;

import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { itemsService } from "../../src/modules/items";
import { NextPageWithLayout } from "../_app";
import {
  Bid,
  BidInput,
  LatestBids,
  BidStatus,
} from "../../components/item/Bid";
import {
  Comment,
  CommentForm,
  CommentList,
  CommentStatus,
} from "../../components/item/Comment";

interface ItemSlugPageProps {
  item: {
    _id: string;
    title: string;
    description: string;
    bids: Array<number>;
    imageUrl: number;
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
        <title>{item.title}</title>
        <meta name="description" content={item.description} />
      </Head>
      <h1>
        {itemTitle} -
        {item.bids?.length ? (
          <>Last bid for &#36;{Math.max(...item.bids)} -</>
        ) : null}
        (slug page)
      </h1>
      <p>{id}</p>
      <p>{item.title}</p>
      <p>{item.description}</p>
      <p>{item.imageUrl}</p>
      <div>
        <Bid>
          <BidInput />
          <BidStatus />
          <LatestBids />
        </Bid>
      </div>
      <div>
        <Comment>
          <CommentForm />
          <CommentStatus status="pending" />
          <CommentList />
        </Comment>
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
    revalidate: 120,
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

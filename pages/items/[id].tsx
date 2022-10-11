import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { itemsService } from "../../src/modules/items";

interface ItemSlugPageProps {
  item: {
    _id: string;
    title: string;
    description: string;
    imageUrl: number;
  };
}

const ItemSlugPage: React.FC<ItemSlugPageProps> = ({item}) => {
  const router = useRouter();
  const slug = router.query?.slug ?? [];

  const id = slug[0];
  const itemTitle = slug[1];

  return (
    <>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  if (!id || !(typeof id === "string")) {
    return {
      notFound: true,
    };
  }

  const _item = await itemsService.findById(id);

  const item = {
    ..._item,
    _id: _item?._id.toString(),
  };

  return {
    props: {
      item,
    },
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
    fallback: false,
  };
};

export default ItemSlugPage;

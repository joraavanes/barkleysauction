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

const ItemSlugPage: React.FC<ItemSlugPageProps> = ({item = {title: null, description: null, imageUrl: null}}) => {
  const router = useRouter();
  const slug = router.query?.slug ?? [];

  const id = slug[0];
  const itemTitle = slug[1];

  return (
    <>
      <h1>{itemTitle} - (slug page)</h1>
      <p>{id}</p>
      <p>{item.title}</p>
      <p>{item.description}</p>
      <p>{item.imageUrl}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug ?? [];

  const id = slug[0];
  const itemTitle = slug[1];

  const _item = await itemsService.findById(id);

  const item = {
    ..._item,
    _id: _item?._id.toString(),
    owner: _item?.owner?.toString() ?? ''
  };

  return {
    props: {
      item,
    },
    revalidate: 120
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const items = await itemsService.getItems();
  const paths = items.map((item) => ({
    params: {
      id: item._id.toString(),
      slug: [item._id.toString(), item.title.replaceAll(' ', '-')],
    },
  }));

  return {
    paths,
    fallback: false
  };
};

export default ItemSlugPage;

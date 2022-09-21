import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface props {
  category: string;
  itemId: number;
  itemName: string;
}

const ItemPage: NextPage<props> = ({ category, itemId, itemName }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady]);

  return (
    <div>
      <h1>{itemName.charAt(0).toUpperCase() + itemName.slice(1)}</h1>
      <p>
        <Link href={"/"}>
          <a href="/">Barkley's</a>
        </Link>
        {" > "}
        <Link href={`/items/${category}`}>
          <a href={`/items/${category}`}>{category}</a>
        </Link>
        {" > "}
        <Link href={`/items/${category}/${itemId}/${itemName}`}>
          <a href={`/items/${category}/${itemId}/${itemName}`}>{itemName}</a>
        </Link>
      </p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const itemSlug = context.params?.itemSlug;

  if (!itemSlug) {
    return {
      props: {},
    };
  }

  return {
    props: {
      category: itemSlug[0],
      itemId: itemSlug[1],
      itemName: itemSlug[2],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          itemSlug: ["furniture-&-appliances", "1523", "stove"],
        },
      },
    ],
  };
};

export default ItemPage;

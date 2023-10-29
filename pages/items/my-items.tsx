import { GetServerSideProps } from "next";
import { NextPageWithLayout } from "../_app";
import { itemsService } from "@/src/modules/items";
import { Item as ItemModel } from "@/src/modules/items/item.model";
import { Item } from "@/components/item/Item";
import MyItems from "@/components/item/my-items";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/users/login",
      },
      props: {},
    };
  }

  const items = await itemsService.getItems({
    limit: Number.MAX_SAFE_INTEGER,
    offset: 0,
  });

  return {
    props: {
      items: items.map((item) => ({
        _id: item._id.toString(),
        title: item.title,
        description: item.description,
      })),
    },
  };
};

const MyItemsPage: NextPageWithLayout<{ items: ItemModel[] }> = ({ items }) => {
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (!data && status === "unauthenticated") {
      router.push("/users/login");
    }
  }, [data, status]);

  if (status === "loading") {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Item>
        <MyItems items={items} />
      </Item>
    </>
  );
};

export default MyItemsPage;

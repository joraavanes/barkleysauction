import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import Grid from "../../components/admin/Grid";
import { Item } from "@/src/modules/items/item.model";

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

  return {
    props: {
      urlOrigin: process.env.ORIGIN_URL,
    },
  };
};

const ItemsAdmin = ({ urlOrigin }: { urlOrigin: string }) => {
  return (
    <>
      <Head>
        <title>Barkleys Auction | Items</title>
      </Head>

      <div className="container-fluid">
        <div className="row">
          <div className="col p-1">
            <h1 className="px-3 mt-4 mb-3">Items&apos; Management</h1>
            <Grid<Item>
              url={`${urlOrigin}/api/items`}
              keyExtractor={(item) => item._id.toString()}
              columns={[
                "title",
                "description",
                "startingBid",
                "createdAt",
                "updatedAt",
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsAdmin;

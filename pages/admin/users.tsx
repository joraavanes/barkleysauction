import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import Grid from "../../components/admin/Grid";
import { User } from "@/src/modules/auth/models/user.model";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      urlOrigin: process.env.ORIGIN_URL,
    },
  };
};

const Users = ({ urlOrigin }: { urlOrigin: string }) => {
  return (
    <>
      <Head>
        <title>Barkleys Auction | Users</title>
      </Head>
      <h1 className="px-3 mt-4 mb-3">Users&apos; Management</h1>
      <Grid<User>
        url={`${urlOrigin}/api/users`}
        keyExtractor={(item) => item._id.toString()}
        columns={["email", "firstname", "lastname", "userConfirmed"]}
      />
    </>
  );
};

export default Users;

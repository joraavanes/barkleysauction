import Head from "next/head";
import React from "react";
import Grid from "../../components/admin/Grid";
import { User } from "@/src/modules/auth/models/user.model";

const Users = () => {
  return (
    <>
      <Head>
        <title>Barkleys Auction | Users</title>
      </Head>
      <h1 className="px-3 mt-4 mb-3">Users' Management</h1>
      <Grid<User>
        columns={["email", "firstname", "lastname", "userConfirmed"]}
        url="http://localhost:3000/api/users"
        keyExtractor={(item) => item._id.toString()}
      />
    </>
  );
};

export default Users;

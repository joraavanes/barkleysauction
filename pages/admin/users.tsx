import Head from "next/head";
import React from "react";
import Grid from "../../components/admin/Grid";

interface User {
  _id: string;
  email: string;
  password: string;
  userConfirmed: boolean;
  name: string;
  surname: string;
}

const Users = () => {
  return (
    <>
      <Head>
        <title>Barkleys Auction | Users</title>
      </Head>
      <h1>Users</h1>
      <Grid<User>
        columns={["email", "name", "surname", "userConfirmed"]}
        url="/api/users"
        keyExtractor={(item) => item._id.toString()}
      />
    </>
  );
};

export default Users;

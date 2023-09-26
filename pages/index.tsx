import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: "/items",
    },
  };
};

const Index = () => {
  return null;
};

export default Index;
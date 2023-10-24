import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { NextPageWithLayout } from "../_app";
import CreateItem from "@/components/item/CreateItem";
import ItemStatus from "@/components/item/ItemStatus";
import { Item } from "@/components/item/Item";

const CreateItemPage: NextPageWithLayout = () => {
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
      <Head>
        <title>New Item | Barkleys Auction</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h1>Create new item</h1>
            <Item>
              <CreateItem />
              <ItemStatus />
            </Item>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/users/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

// CreateItemPage.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <main>
//       <Head>
//         <title>New Item</title>
//       </Head>
//       {page}
//     </main>
//   );
// };

export default CreateItemPage;

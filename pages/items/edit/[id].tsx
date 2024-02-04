import { ReactElement } from "react";
import Head from "next/head";
import EditItem from "@/components/item/EditItem";
import { Item } from "@/components/item/Item";
import { NextPageWithLayout } from "@/pages/_app";
import ItemStatus from "@/components/item/ItemStatus";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { itemsService } from "../../../src/modules/items";
import { Item as ItemType } from "@/shared/types/Item";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session  = await getSession({ req: context.req });
  const id = context.query?.id as string;

  if (id) {
    const item = await itemsService.findById(id);

    return {
      props: {
        item: {
          title: item?.title,
          description: item?.description,
          imageUrl: item?.imageUrl,
          startingBid: item?.startingBid,
          userId: session?.user.id
        },
      },
    };
  }

  return {
    props: {},
  };
};

const EditItemPage: NextPageWithLayout<{ item: ItemType }> = (props) => {
  const router = useRouter();

  const id = router.query?.id as string;

  return (
    <>
      <Head>
        <title>Edit {props.item.title}</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h1>Edit an item with id: {router?.query?.id}</h1>
            <Item>
              <EditItem id={id} item={props.item} />
              <ItemStatus />
            </Item>
          </div>
        </div>
      </div>
    </>
  );
};

// EditItemPage.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <main>
//       <Head>
//         <title>edit Item</title>
//       </Head>
//       {page}
//     </main>
//   );
// };

export default EditItemPage;

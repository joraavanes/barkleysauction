import Head from "next/head";
import { GetServerSideProps } from "next";
import { useEffect, useMemo, useRef, useState } from "react";
import { itemsService } from "@/src/modules/items";
import type { NextPageWithLayout } from "../_app";
import { ViewItem } from "@/shared/types/Item";
import ItemCard from "@/components/item/ItemCard";
import Spinner from "@/components/shared/Spinner";

interface IndexProps {
  _items: Array<ViewItem>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const items = await itemsService.getItems({
    limit: 5,
    offset: 0,
  });
  const serializedItems = items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    owner: item.owner?.toString() ?? "",
  }));

  return {
    props: {
      _items: serializedItems,
    },
  };
};

const Index: NextPageWithLayout<IndexProps> = ({ _items }) => {
  const [items, setItems] = useState(() => _items ?? []);
  const [counter, setCounter] = useState<number | undefined>();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  async function getItems(page: number | undefined) {
    const res = await fetch(`/api/items?page=${page}&pageSize=5`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setCounter((prev) => (prev ? prev + 1 : 1));
        }
      },
      {
        threshold: 0.5,
      }
    );
    observer.observe(loaderRef.current as HTMLDivElement);
  }, []);

  useMemo(() => {
    if (counter)
      getItems(counter).then((data) => {
        setItems((prev) => [...prev, ...data]);
      });
  }, [counter]);

  return (
    <div>
      <Head>
        <title>Current Listed Items</title>
      </Head>
      <div className="container-fluid">
        <div className="row mt-3 ms-2 me-2 gy-3">
          {items.map((item) => (
            <ItemCard item={item} key={item._id} />
          ))}
        </div>
        <div className="row mt-3 ms-2 me-2 mb-3 gy-3">
          <div className="d-flex justify-content-center" ref={loaderRef}>
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
};

// Return page component with a specific layout
// Index.getLayout = function getLayout(page: ReactElement){
//   return page;
// }

export default Index;

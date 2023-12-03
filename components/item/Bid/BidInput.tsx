import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useBid } from "./Bid";
import { Button } from "./Button";
import { queryClient } from "@/pages/_app";
import useMutate from "@/hooks/useMutate";
import { Status } from "@/shared/types";
import styles from "./styles/Bid.module.css";
import priceCommaDivider from "@/shared/utility/priceCommaDivider";

export const BidInput: React.FC = () => {
  const { data } = useSession();
  const [bid, setBid] = useState<number>(0);
  const [displayBid, setDisplayBid] = useState<string>("");
  const {
    state: { itemId },
    setState,
  } = useBid();

  const {
    mutate,
    state: { status: mutationStatus, errorMessage },
  } = useMutate("/api/bids", {
    method: "POST",
    timeout: 5000,
    ContentType: "application/json",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!data || !data.user) {
      setState((prev) => ({
        ...prev,
        status: Status.error,
        errorMessage: (
          <>
            Please{" "}
            <Link href="/users/login">
              <a className="text-decoration-dashed primary-pink">Log in</a>
            </Link>{" "}
            to bid items
          </>
        ),
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      status: Status.loading,
      newBid: bid,
    }));

    mutate({
      price: bid,
      bidder: data.user?.id,
      item: itemId!,
    });
  };

  useEffect(() => {
    if (mutationStatus === Status.error) {
      setState((prev) => ({
        ...prev,
        status: mutationStatus,
        errorMessage: <p className="primary-pink">{errorMessage}</p>,
      }));
    }

    if (mutationStatus === Status.success) {
      setBid(0);
      setDisplayBid("");
      queryClient.invalidateQueries({ queryKey: [`bids/${itemId}`] });
    }
  }, [mutationStatus, itemId, setState]);

  return (
    <>
      <h2 className="mt-sm-3">Your Bid</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="d-flex justify-content-around mt-3 mb-3">
            <input
              className={`${styles.bidInput} form-control`}
              type="text"
              name="bid"
              id="bid"
              value={displayBid}
              role="textbox"
              autoComplete="off"
              placeholder="Enter your bid"
              onChange={(e) => {
                const isNumber = /^(\s*|\d+)$/.test(
                  e.target.value.replaceAll(",", "").replaceAll(".", "")
                );
                if (!isNumber) {
                  setBid((bid) => bid);
                  setDisplayBid((displayBid) => displayBid);
                  return;
                }

                setBid(+e.target.value);
                setDisplayBid(priceCommaDivider(e.target.value));
              }}
            />
            <Button>Add bid</Button>
          </div>
        </div>
      </form>
    </>
  );
};

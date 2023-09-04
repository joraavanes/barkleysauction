import { FormEvent, useEffect, useState } from "react";
import { useBid } from "./Bid";
import { Button } from "./Button";
import { queryClient } from "@/pages/_app";
import useMutate from "@/hooks/useMutate";
import { Status } from "@/shared/types";
import styles from "./styles/Bid.module.css";

export const BidInput: React.FC = () => {
  const [bid, setBid] = useState(0);
  const {
    state: { itemId },
    setState,
  } = useBid();

  const {
    mutate,
    state: { status: mutationStatus },
  } = useMutate("/api/bids", {
    method: "POST",
    timeout: 5000,
    ContentType: "application/json",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setState((prev) => ({
      ...prev,
      status: Status.loading,
      newBid: bid,
    }));

    mutate({
      price: bid.toString(),
      bidder: "64e10f1a4ae5ba3a51cfaec7",
      item: itemId!,
    });
  };

  useEffect(() => {
    // if (mutationStatus !== Status.success)
      setState((prev) => ({ ...prev, status: mutationStatus }));

    if (mutationStatus === Status.success) {
      setBid(0);
      queryClient.invalidateQueries({ queryKey: [`bids/${itemId}`] });
    }
  }, [mutationStatus]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="d-flex justify-content-around mt-3 mb-3">
            <input
              className={`${styles.bidInput} form-control`}
              type="number"
              step="0.01"
              name="bid"
              id="bid"
              value={bid}
              role="textbox"
              onChange={(e) => setBid(e.target.valueAsNumber)}
            />
            <Button>Add bid</Button>
          </div>
        </div>
      </form>
    </>
  );
};

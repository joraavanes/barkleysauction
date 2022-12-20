import { FormEvent, useState } from "react";
import { useBid } from "./Bid";
import { Button } from "./Button";

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

async function updateBid(newBid: number, lastBids: number[]) {
  await sleep(1500);
  if (newBid <= Math.max(...lastBids)) {
    return Promise.reject({ message: "Bid must be higher than previous ones" });
  }
  return [newBid, ...lastBids].slice(0, 10);
}

export const BidInput: React.FC = () => {
  const {
    state: { newBid, bids, status },
    setState,
  } = useBid();
  const [bid, setBid] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setState({ status: "pending", newBid: bid, bids });
    updateBid(bid, bids).then(
      (state) => setState({ status: "success", bids: state }),
      (error) => setState({ status: "fail", bids })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="bid"
          id="bid"
          value={bid}
          onChange={(e) => setBid(e.target.valueAsNumber)}
        />
        <Button>Add bid</Button>
      </form>
    </>
  );
};
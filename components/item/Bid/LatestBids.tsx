import useQuery from "@/hooks/useQuery";
import { BidState, Status, useBid } from "./Bid";
import { useEffect } from "react";
import { ViewBid } from "@/shared/types/bid";

export const LatestBids: React.FC = () => {
  const {
    state: { bids, itemId },
    setState,
  } = useBid();

  const { data } = useQuery(`/api/items/${itemId}/bids`, `bids/${itemId}`, {
    timeout: 5000,
    ContentType: "application/json",
  });

  useEffect(() => {
    setState((prev: BidState) => ({
      ...prev,
      bids: data as Array<ViewBid>,
      status: Status.success,
    }));
  }, [data]);

  return (
    <>
      <h3>Bids: {bids ? bids.length : null}</h3>
      {bids?.length ? (
        <ul>
          {bids
            .sort((a, b) => b.price - a.price)
            .map((bid) => (
              <li key={bid._id}>{bid.price}</li>
            ))}
        </ul>
      ) : (
        <p>No bids has received yet!</p>
      )}
    </>
  );
};

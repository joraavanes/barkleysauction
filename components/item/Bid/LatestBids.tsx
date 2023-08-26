import { useEffect } from "react";
import useQuery from "@/hooks/useQuery";
import { BidState, Status, useBid } from "./Bid";
import { ViewBid } from "@/shared/types/bid";
import { BidGroupStyled, BidItemStyled } from "./styles";

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
        <BidGroupStyled>
          {bids
            .sort((a, b) => b.price - a.price)
            .map((bid) => (
              <BidItemStyled key={bid._id}>
                <div className="media-body ml-3">
                  <h5 className="mt-0">{bid.bidder}</h5>
                  has bid <i className="fas fa-pound-sign xs-margin"></i>
                  {bid.price.toLocaleString()} -{" "}
                  {bid.createdAt.toLocaleString()}
                </div>
              </BidItemStyled>
            ))}
        </BidGroupStyled>
      ) : (
        <p>No bids has received yet!</p>
      )}
    </>
  );
};

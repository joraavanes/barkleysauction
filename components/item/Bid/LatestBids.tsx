import { useEffect } from "react";
import moment from "moment";
import useQuery from "@/hooks/useQuery";
import { BidState, Status, useBid } from "./Bid";
import { ViewBid } from "@/shared/types/bid";
import { BidGroupStyled, BidItemStyled } from "./styles";
import Avatar, { genConfig } from "react-nice-avatar";

const bidMoment = (timestamp: number) => {
  const currentTime = moment();

  const minutes = currentTime.diff(timestamp, "minutes");
  const hours = currentTime.diff(timestamp, "hours");
  const days = currentTime.diff(timestamp, "days");
  const weeks = currentTime.diff(timestamp, "weeks");

  if (weeks) return weeks == 1 ? `a week ago` : `${weeks} weeks ago`;
  if (days) return days == 1 ? `a day ago` : `${days} days ago`;
  if (hours) return hours == 1 ? `an hour ago` : `${hours} hours ago`;
  if (minutes) return minutes == 1 ? `a minute ago` : `${minutes} minutes ago`;

  return "a few moments ago";
};

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
                <div className="row">
                  <div className="col-2">
                    <Avatar
                      {...genConfig()}
                      style={{
                        width: "3rem",
                        height: "3rem",
                      }}
                    />
                  </div>
                  <div className="col-10">
                    <h5 className="line-clamp-1">{bid.bidder}</h5>
                    has bid <i className="fas fa-pound-sign xs-margin"></i>
                    {bid.price.toLocaleString()} -{" "}
                    {bidMoment(bid.createdAt.valueOf())}
                  </div>
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

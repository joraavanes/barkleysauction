import { useEffect } from "react";
import moment from "moment";
import useQuery from "@/hooks/useQuery";
import Avatar, { genConfig } from "react-nice-avatar";
import { BidState, useBid } from "./Bid";
import { ViewBid } from "@/shared/types/bid";
import { Status } from "@/shared/types";
import { BidGroupStyled, BidItemStyled } from "./styles";
import { BidsSpinnerContainer } from "./styles/BidsSpinnerContainer.styled";
import { elapsedTimeCaption } from "@/shared/utility/elapsedTimeCaption";

export const LatestBids: React.FC = () => {
  const {
    state: { bids, itemId, status },
    setState,
  } = useBid();

  const { data, status: queryStatus, isLoading } = useQuery(
    `/api/items/${itemId}/bids?page=0&pagesize=5`,
    `bids/${itemId}`,
    {
      timeout: 5000,
      ContentType: "application/json",
    }
  );

  useEffect(() => {
    setState((prev: BidState) => ({
      ...prev,
      bids: data as Array<ViewBid>,
      status: Status[queryStatus],
    }));
  }, [data, setState, queryStatus]);

  return (
    <div className="mt-3">
      <h3>Latest Bids</h3>
      {bids?.length ? (
        <div className="position-relative">
          {(isLoading || status === Status.loading) && (
            <BidsSpinnerContainer>
              <div className="spinner-border text-danger" role="loading">
                <span className="sr-only"></span>
              </div>
            </BidsSpinnerContainer>
          )}
          <BidGroupStyled>
            {bids
              .sort((a, b) => b.price - a.price)
              .map((bid) => (
                <BidItemStyled key={bid._id} role="listitem">
                  <div className="row">
                    <div className="col-2 d-flex justify-content-center">
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
                      has bid <i className="bi bi-currency-euro"></i>
                      {bid.price.toLocaleString()} -{" "}
                      {elapsedTimeCaption(bid.createdAt.valueOf())}
                    </div>
                  </div>
                </BidItemStyled>
              ))}
          </BidGroupStyled>
        </div>
      ) : (
        <p>No bids has received yet!</p>
      )}
    </div>
  );
};

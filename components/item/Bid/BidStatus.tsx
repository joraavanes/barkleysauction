import React from "react";
import { Status, useBid } from "./Bid";

export const BidStatus: React.FC = () => {
  const { state } = useBid();
  const { status } = state;

  if (status === Status.pending) return <span role="pending">Loading...</span>;
  if(status === Status.error) return <span role="alert">Error</span>

  return <div>{Status[status]}</div>;
};

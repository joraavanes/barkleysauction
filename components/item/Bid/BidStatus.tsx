import React from "react";
import { useBid } from "./Bid";

export const BidStatus: React.FC = () => {
  const { state } = useBid();
  const { status } = state;
  return <div>{status}</div>;
};

import React from "react";
import { useBid } from "./Bid";
import { Status } from "@/shared/types";

export const BidStatus: React.FC = () => {
  const { state } = useBid();
  const { status } = state;

  if (status === Status.loading) return <span role="pending">Loading...</span>;
  if(status === Status.error) return <span role="alert">Error</span>

  return <div>{Status[status]}</div>;
};

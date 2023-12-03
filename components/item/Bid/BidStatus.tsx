import React from "react";
import { useBid } from "./Bid";
import { Status } from "@/shared/types";

export const BidStatus: React.FC = () => {
  const { state } = useBid();
  const { status } = state;

  if (status === Status.loading)
    return (
      <div className="spinner-border spinner-border-sm text-primary" role="status">
        <span className="sr-only" role="pending"></span>
      </div>
    );

  if (status === Status.error) return <span role="alert">{state.errorMessage ? state.errorMessage : "Error"}</span>;

  return null; // <div>{Status[status]}</div>;
};

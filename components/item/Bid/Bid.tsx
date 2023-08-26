import React, { createContext, useContext, useState } from "react";
import { ViewBid } from "@/shared/types/bid";

interface BidProps {
  itemId: string;
  children?: JSX.Element | JSX.Element[];
}

export enum Status {
  idle,
  pending,
  success,
  error,
}

export type BidState = {
  itemId?: string;
  status: Status;
  bids: Array<ViewBid>;
  newBid?: number;
};

interface BidContextType {
  state: BidState;
  setState: React.Dispatch<React.SetStateAction<BidState>>;
}

const BidContext = createContext<BidContextType | null>(null);

export const Bid: React.FC<BidProps> = ({ children, itemId }) => {
  const [state, setState] = useState<BidState>({
    itemId,
    bids: [],
    status: Status.idle,
  });

  return (
    <BidContext.Provider value={{ state, setState }}>
      {children}
    </BidContext.Provider>
  );
};

export const useBid = () => {
  const state = useContext(BidContext) as BidContextType;
  if (!state)
    throw new Error("Component must be within the BidContext.Provider");
  return state;
};

import React, { createContext, useContext, useState } from "react";

interface BidProps {
  children?: JSX.Element | JSX.Element[];
}

export enum Status {
  idle,
  pending,
  success,
  error
}

interface BidState {
  status: Status;
  bids: number[];
  newBid?: number;
}

interface BidContextType {
  state: BidState;
  setState(state: BidState): void;
}

const BidContext = createContext<BidContextType | null>(null);

export const Bid: React.FC<BidProps> = ({ children }) => {
  const [state, setState] = useState<BidState>({
    bids: [53, 39, 23, 5, 91, 16, 6],
    status: Status.idle
  });

  return (
    <BidContext.Provider value={{ state, setState }}>
      {children}
    </BidContext.Provider>
  );
};

export const useBid = () => {
  const state = useContext(BidContext) as BidContextType;
  if(!state)
    throw new Error('Component must be within the BidContext.Provider');
  return state;
};

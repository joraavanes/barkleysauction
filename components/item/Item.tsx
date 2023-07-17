import React, { createContext, useContext, useState } from "react";

export type Item = {
  title: string;
  description: string;
  startingBid: number;
  imageUrl?: string;
  UserId: string;
  itemId?: string;
};

export enum Status {
  idle,
  loading,
  success,
  error,
}

export interface ItemState {
  item: Item;
  status: Status;
  error?: string;
}

interface ItemContextType {
  setstate: React.Dispatch<React.SetStateAction<ItemState>>;
  state: ItemState;
}

const initialState: ItemState = {
  item: {
    title: "",
    description: "",
    startingBid: 0,
    UserId: "6350f85dc6f3a606c53f8e66",
  },
  status: Status.idle,
};

const ItemContext = createContext<ItemContextType | null>(null);

export const Item: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setstate] = useState<ItemState>(initialState);

  return (
    <ItemContext.Provider value={{ state, setstate }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => {
  const state = useContext(ItemContext) as ItemContextType;
  if (!state)
    throw new Error("Component must be whithin the ItemContext.Provider");
  return state;
};

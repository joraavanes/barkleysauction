import React, { createContext, useContext, useState } from "react";
import { Status } from "@/shared/types";

export type Item = {
  title: string;
  description: string;
  startingBid: string;
  image?: File | null;
  UserId: string;
  itemId?: string;
};

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
    startingBid: "0",
    UserId: "63510298c6f3a606c53f8e69",
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

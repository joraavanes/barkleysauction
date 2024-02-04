import React, { createContext, useContext, useState } from "react";
import { Status } from "@/shared/types";
import { Item as ItemModel } from "@/shared/types/Item";

export interface ItemState {
  item: ItemModel;
  status: Status;
  error?: string;
}

interface ItemContextType {
  setState: React.Dispatch<React.SetStateAction<ItemState>>;
  state: ItemState;
}

const initialState: ItemState = {
  item: {
    title: "",
    description: "",
    startingBid: "0",
  },
  status: Status.idle,
};

const ItemContext = createContext<ItemContextType | null>(null);

export const Item: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ItemState>(initialState);

  return (
    <ItemContext.Provider value={{ state, setState }}>
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

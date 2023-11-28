export type ViewItem = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  startingBid: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Item = {
  title: string;
  description: string;
  startingBid: string;
  image?: File | null;
  UserId: string;
  itemId?: string;
};
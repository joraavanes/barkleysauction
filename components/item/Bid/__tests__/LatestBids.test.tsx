import "whatwg-fetch";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bid } from "../Bid";
import { BidStatus, LatestBids } from "../";
import createMockServer from "../../../../mocks/server";

function Wrapper({ children }: { children: JSX.Element }) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Bid itemId="64e24d09cadb0233db79daa0">
        {children}
        <BidStatus />
      </Bid>
    </QueryClientProvider>
  );
}

let responsePayload = [
  {
    _id: "64efbaa828ace1d7b7f7f7d1",
    price: 39.99,
    bidder: "64e10f1a4ae5ba3a51cfaec7",
    item: "64e24d09cadb0233db79daa0",
    createdAt: "2023-08-30T21:54:48.534Z",
  },
  {
    _id: "64efbabb28ace1d7b7f7f7d2",
    price: 54.99,
    bidder: "64e10f1a4ae5ba3a51cfaec7",
    item: "64e24d09cadb0233db79daa0",
    createdAt: "2023-08-30T21:55:07.532Z",
  },
  {
    _id: "64f3057895b7b8dffc886511",
    price: 59.99,
    bidder: "64e10f1a4ae5ba3a51cfaec7",
    item: "64e24d09cadb0233db79daa0",
    createdAt: "2023-09-02T09:50:48.973Z",
  },
  {
    _id: "64f32c1c618fce1178abe970",
    price: 69,
    bidder: "64e10f1a4ae5ba3a51cfaec7",
    item: "64e24d09cadb0233db79daa0",
    createdAt: "2023-09-02T12:35:40.614Z",
  },
];

export const handlers = [
  rest.get(
    "/api/items/64e24d09cadb0233db79daa0/bids",
    async (req, res, ctx) => {
      return res(ctx.json(responsePayload));
    }
  ),
];

const server = createMockServer(handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

test("Display bids on the screen", async () => {
  render(<LatestBids />, { wrapper: Wrapper });

  await waitFor(
    () => {
      expect(screen.queryByRole(/pending/i)).not.toBeInTheDocument();
    },
    { timeout: 1000 }
  );

  const bids = await screen.findAllByRole("listitem");
  expect(bids.length).toBe(responsePayload.length);
});

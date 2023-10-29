import "whatwg-fetch";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bid } from "../Bid";
import { BidInput, BidStatus } from "../";
import createMockServer from "../../../../mocks/server";
import { SessionProvider } from "next-auth/react";

function Wrapper({ children }: { children: JSX.Element }) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SessionProvider
        session={{
          user: { id: "1", email: "frank@mail.com" },
          expires: new Date().toISOString(),
        }}
      >
        <Bid itemId="64e24d09cadb0233db79daa0">
          {children}
          <BidStatus />
        </Bid>
      </SessionProvider>
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
  rest.post("/api/bids", async (req, res, ctx) => {
    const body = await req.json();

    const bids = responsePayload.map((bid) => bid.price);
    const maxBid = Math.max(...bids);

    if (maxBid >= Number(body.price)) {
      return res(
        ctx.status(400),
        ctx.json({ erro: "Bid is not higher than current bid" })
      );
    }

    return res(
      ctx.json({
        result: "success",
      })
    );
  }),
];

const server = createMockServer(handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

test("should successfully add new bid to the item", async () => {
  render(<BidInput />, { wrapper: Wrapper });

  await waitFor(
    () => {
      expect(screen.queryByRole(/pending/i)).not.toBeInTheDocument();
    },
    { timeout: 1000 }
  );

  const bidInput = screen.getByRole("textbox");
  const submitBtn = screen.getByRole("button");

  await userEvent.type(bidInput, "70");
  await userEvent.click(submitBtn);

  await waitFor(
    () => {
      expect(screen.queryByRole(/pending/i)).not.toBeInTheDocument();
    },
    { timeout: 5000 }
  );

  const apiRejected = await screen.queryByRole("alert");
  expect(apiRejected).not.toBeInTheDocument();
});

test("should display error when bid is lower than current highest bid", async () => {
  render(<BidInput />, { wrapper: Wrapper });

  await waitFor(
    () => {
      expect(screen.queryByRole(/pending/i)).not.toBeInTheDocument();
    },
    { timeout: 1000 }
  );

  const bidInput = screen.getByRole("textbox");
  const submitBtn = screen.getByRole("button");

  await userEvent.type(bidInput, "65");
  await userEvent.click(submitBtn);

  await waitFor(
    () => {
      expect(screen.queryByRole(/pending/i)).not.toBeInTheDocument();
    },
    { timeout: 5000 }
  );

  const apiRejected = await screen.queryByRole("alert");
  expect(apiRejected).toBeInTheDocument();
});

// test("should display the new bid on the screen", async () => {
//   render(<BidInput />, { wrapper: Wrapper });
//   const bidInput = screen.getByRole("spinbutton");
//   const submitBtn = screen.getByRole("button", { name: /add bid/i });

//   await userEvent.type(bidInput, "100");
//   await userEvent.click(submitBtn);

//   await waitForElementToBeRemoved(() => screen.getByRole(/pending/i), {
//     timeout: 1000,
//   });

//   const bidItems = await screen.queryAllByRole("listitem");

//   expect(bidItems[0].textContent).toBe("100");
//   expect(screen.getByText(/100/i)).toBeInTheDocument();
// });

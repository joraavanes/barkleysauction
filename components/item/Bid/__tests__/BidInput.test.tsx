import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Bid } from "../Bid";
import { BidInput, BidStatus, LatestBids } from "../";

function Wrapper({ children }) {
  return (
    <Bid>
      {children}
      <LatestBids />
      <BidStatus />
    </Bid>
  );
}

test("should display the new bid on the screen", async () => {
  render(<BidInput />, { wrapper: Wrapper });
  const bidInput = screen.getByRole("spinbutton");
  const submitBtn = screen.getByRole("button", { name: /add bid/i });

  await userEvent.type(bidInput, "100");
  await userEvent.click(submitBtn);

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
    timeout: 1000,
  });

  const bidItems = screen.getAllByRole("listitem");

  expect(bidItems[0].textContent).toBe("100");
  expect(screen.getByText(/100/i)).toBeInTheDocument();
});

test("should display error on the screen if bid is not greater than existing bids", async () => {
  render(<BidInput />, { wrapper: Wrapper });
  const bidInput = screen.getByRole("spinbutton");
  const submitBtn = screen.getByRole("button", { name: /add bid/i });
  const bidItems = screen.getAllByRole("listitem");

  await userEvent.type(bidInput, "90");
  await userEvent.click(submitBtn);

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
    timeout: 1000,
  });

  const error = screen.getByRole("alert");

  expect(error).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")[0].textContent).toBe(
    bidItems[0].textContent
  );
});

import "whatwg-fetch";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { rest } from "msw";
import CreateItem from "../CreateItem";
import createMockServer from "../../../mocks/server";
import { Item } from "../Item";
import ItemStatus from "../ItemStatus";

const QueryProviderWrapper = () => (
  <QueryClientProvider client={new QueryClient()}>
    <Item>
      <CreateItem />
      <ItemStatus />
    </Item>
  </QueryClientProvider>
);

interface ResponseBody {
  acknowledged?: boolean;
  insertedId?: string;
}

export const handlers = [
  rest.post("/api/items", async (req, res, ctx) => {
    const body = await req.json();

    let responseBody: ResponseBody = {
      acknowledged: true,
      insertedId: "64a925e4ec55965615f71f54",
    };

    if (!body.title || !body.description)
      return res(ctx.status(400), ctx.json({ acknowledged: false }));

    return res(ctx.json(responseBody));
  }),
];

const server = createMockServer(handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

test("should create an item successfully", async () => {
  render(<QueryProviderWrapper />);
  const titleInput = screen.getByRole("textbox", {
    name: /title/i,
  });
  const descriptionInput = screen.getByRole("textbox", {
    name: /description/i,
  });
  const submitBtn = screen.getByRole("button", {
    name: /add item/i,
  });

  await userEvent.type(titleInput, "Broom");
  await userEvent.type(descriptionInput, "Broom");
  await userEvent.click(submitBtn);

  await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));

  expect(
    await screen.getByText(/Changes successfuly done!/i)
  ).toBeInTheDocument();
});

test("should fail creating an item", async () => {
  render(<QueryProviderWrapper />);
  const titleInput = screen.getByRole("textbox", {
    name: /title/i,
  });
  const submitBtn = screen.getByRole("button", {
    name: /add item/i,
  });

  await userEvent.type(titleInput, "Broom");
  await userEvent.click(submitBtn);

  await waitForElementToBeRemoved(() => screen.getByText(/loading\.\.\./i));

  expect(await screen.getByRole("alert")).toBeInTheDocument();
});

afterAll(() => server.close());

import "whatwg-fetch";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { faker } from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import {
  Comment,
  CommentStatus,
  CommentList,
  CommentForm,
} from "@/components/item/Comment";
import createMockServer from "../../../../mocks/server";
import { rest } from "msw";
import { SessionProvider } from "next-auth/react";

function Wrapper({ children }: { children: JSX.Element | JSX.Element[] }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <SessionProvider
        session={{
          user: { id: "1", email: "frank@mail.com" },
          expires: new Date().toISOString(),
        }}
      >
        <Comment itemId="10">{children}</Comment>
      </SessionProvider>
    </QueryClientProvider>
  );
}

const ComponentTree = (props) => (
  <>
    <CommentForm />
    <CommentList />
  </>
);

let responsePayload = [
  {
    _id: "651548a27095094844a66cb4",
    user: "63510298c6f3a606c53f8e69",
    item: "64e5e419094b84c5a5bbc630",
    content: "Best one",
    approved: true,
    username: "andrew",
    createdAt: "2023-09-28T09:34:26.367Z",
  },
  {
    _id: "651548917095094844a66cb3",
    user: "63510298c6f3a606c53f8e69",
    item: "64e5e419094b84c5a5bbc630",
    content: "just nice one",
    approved: true,
    username: "andrew",
    createdAt: "2023-09-28T09:34:09.654Z",
  },
  {
    _id: "651548627095094844a66cb2",
    user: "63510298c6f3a606c53f8e69",
    item: "64e5e419094b84c5a5bbc630",
    content: "my choice",
    approved: true,
    username: "andrew",
    createdAt: "2023-09-28T09:33:22.887Z",
  },
];

export const handlers = [
  rest.get("/api/comments/10", async (req, res, ctx) => {
    return res(ctx.json(responsePayload));
  }),
];

const server = createMockServer(handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

test("CommentList should print 3 comments", async () => {
  render(<ComponentTree />, { wrapper: Wrapper });

  await waitFor(
    () => {
      expect(screen.queryByRole(/loading/i)).not.toBeInTheDocument();
    },
    { timeout: 4000 }
  );

  const commentList = await screen.findAllByRole("listitem");

  expect(commentList).toBeDefined();
  expect(commentList.length).toBe(3);
});

// test("should display the posted comment in the CommentList", async () => {
//   render(<ComponentTree />, { wrapper: Wrapper });
//   await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
//     timeout: 2000,
//   });

//   const submitBtn = screen.getByRole("button", { name: /post/i });
//   const commentInput = screen.getByRole("textbox");

//   const commentText = faker.lorem.paragraph(1);
//   await userEvent.type(commentInput, commentText);
//   await userEvent.click(submitBtn);

//   await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
//     timeout: 2000,
//   });

//   const commentItems = screen.getAllByRole("listitem");
//   expect(screen.getByText(commentText)).toBeInTheDocument();
//   expect(commentItems.length).toBe(5);
// });

import "whatwg-fetch";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  Comment,
  CommentForm,
  CommentList,
  CommentStatus,
} from "@/components/item/Comment";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/pages/_app";
import createMockServer from "../../../../mocks/server";
import { rest } from "msw";
import { SessionProvider } from "next-auth/react";

describe("<CommentForm/>", () => {
  function Wrapper({ children }: { children: JSX.Element }) {
    return (
      <QueryClientProvider client={queryClient}>
        <SessionProvider
          session={{
            user: { id: "1", name: "Frank", email: "frank@mail.com" },
            expires: new Date().toLocaleDateString()
          }}
        >
          <Comment itemId="1">
            {children}
            <CommentStatus />
          </Comment>
        </SessionProvider>
      </QueryClientProvider>
    );
  }

  let payload: Array<any> = [];

  const handlers = [
    rest.get("/api/comments/1", async (req, res, ctx) => {
      // console.log("GET /api/comments/1 CALLED");
      return res(ctx.json(payload));
    }),
    rest.post("/api/comments", async (req, res, ctx) => {
      // console.log("POST /api/comments CALLED");
      const body = await req.json();

      body._id = "1";
      payload.push(body);

      return res(ctx.status(201), ctx.json(payload));
    }),
  ];

  const server = createMockServer(handlers);

  beforeAll(() => server.listen());

  afterEach(() => {
    payload.pop();
    render(<></>, { wrapper: Wrapper });
  });

  beforeEach(() => {
    render(<></>, { wrapper: Wrapper });
  });

  test("should display the posted comment if request is done successfully", async () => {
    render(
      <>
        <CommentForm />
        <CommentList />
      </>,
      { wrapper: Wrapper }
    );
    const commentText = faker.lorem.paragraph(1);

    const commentInput = screen.getByRole("textbox");
    const submitBtn = screen.getByRole("button", { name: /post/i });

    await userEvent.type(commentInput, commentText);
    await userEvent.click(submitBtn);

    await waitForElementToBeRemoved(() => screen.queryByRole(/loading/i));

    const commentList = await screen.findAllByRole("listitem");
    const listedComment = await screen.findByText(commentText);

    expect(listedComment).toHaveTextContent(commentText);
    expect(commentList.length).toBe(1);
  });

  test("should give error if comment is empty", async () => {
    render(
      <>
        <CommentForm />
        <CommentList />
      </>,
      {
        wrapper: Wrapper,
      }
    );

    const submitBtn = screen.getByRole("button", {
      name: /post/i,
    });
    await userEvent.click(submitBtn);

    const commentList = await screen.queryAllByRole("listitem");

    expect(commentList.length).toBe(0);
  });
});

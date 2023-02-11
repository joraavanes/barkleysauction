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
  CommentStatus,
} from "@/components/item/Comment";
import * as commentFuncs from "@/components/item/getComments";

jest.mock("../../getComments", () => {
  return {
    ...jest.requireActual("../../getComments"),
    postComment: jest.fn().mockImplementation(() => {
      var timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(commentFuncs.DUMMY_COMMENTS);
        }, 0);
      });
      return timeoutPromise;
    }),
  };
});

const CommentFormWithProvider = () => (
  <Comment>
    <CommentForm />
    <CommentStatus />
  </Comment>
);

test("should display success when a comment is submitted", async () => {
  render(<CommentFormWithProvider />);
  const commentText = faker.lorem.paragraph(1);

  const commentInput = screen.getByRole("textbox");
  const submitBtn = screen.getByRole("button", { name: /post/i });

  await userEvent.type(commentInput, commentText);
  await userEvent.click(submitBtn);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  // await waitForElementToBeRemoved(() => screen.queryByText(/loading/i), {
  //   timeout: 1000,
  // });

  expect(commentFuncs.postComment).toHaveBeenCalledWith(commentText);
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});

test("should display error while comment is failed to post", async () => {
  jest
    .spyOn(commentFuncs, "postComment")
    .mockImplementation((comment: string) => {
      var timeoutPromise = new Promise((resolve, reject) =>
        setTimeout(reject, 0)
      );
      return timeoutPromise;
    });

  render(<CommentFormWithProvider />);
  const commentText = faker.lorem.paragraph(1);

  const commentInput = screen.getByRole("textbox");
  const submitBtn = screen.getByRole("button", { name: /post/i });

  await userEvent.type(commentInput, commentText);
  await userEvent.click(submitBtn);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  expect(commentFuncs.postComment).toHaveBeenCalledWith(commentText);
  expect(screen.getByRole("alert")).toBeInTheDocument();
});

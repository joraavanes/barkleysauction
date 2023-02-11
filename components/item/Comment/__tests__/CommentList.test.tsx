import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Comment, CommentStatus, CommentList } from "@/components/item/Comment";

const CommentListWithProvider = () => (
  <Comment>
    <CommentStatus />
    <CommentList />
  </Comment>
);

test("CommentList should print 4 comments", async () => {
  render(<CommentListWithProvider />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  const commentList = screen.getAllByRole("listitem");

  expect(commentList).toBeDefined();
  expect(commentList.length).toBe(4);
});

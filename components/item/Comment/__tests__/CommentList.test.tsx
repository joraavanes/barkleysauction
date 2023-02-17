import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  Comment,
  CommentStatus,
  CommentList,
  CommentForm,
} from "@/components/item/Comment";

const CommentListWithProvider = () => (
  <Comment>
    <CommentStatus />
    <CommentList />
  </Comment>
);

function Wrapper({ children } : {children: JSX.Element | JSX.Element[]}) {
  return <Comment>{children}</Comment>;
}

const ComponentTree = (props) => (
  <>
    <CommentForm />
    <CommentStatus />
    <CommentList />
  </>
);

test("CommentList should print 4 comments", async () => {
  render(<CommentListWithProvider />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  const commentList = screen.getAllByRole("listitem");

  expect(commentList).toBeDefined();
  expect(commentList.length).toBe(4);
});

test("should display the posted comment in the CommentList", async () => {
  render(<ComponentTree />, { wrapper: Wrapper });
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
    timeout: 2000,
  });
  
  const submitBtn = screen.getByRole("button", { name: /post/i });
  const commentInput = screen.getByRole('textbox');
  
  const commentText = faker.lorem.paragraph(1);
  await userEvent.type(commentInput, commentText);
  await userEvent.click(submitBtn);
  
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
    timeout: 2000,
  });

  const commentItems = screen.getAllByRole('listitem');
  expect(screen.getByText(commentText)).toBeInTheDocument();
  expect(commentItems.length).toBe(5);
});

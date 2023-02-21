import Link from "next/link";
import { faker } from "@faker-js/faker";
import { GetStaticProps, NextPage } from "next";

const reviews = [
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: '63453023667f61c23a284354',
    productName: faker.lorem.words(2),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: '63453023667f61c23a284354',
    productName: faker.lorem.words(2),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: '6353bd5f1056350c27c548b7',
    productName: faker.lorem.words(2),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: '63553ba4c2e3d68b364242b6',
    productName: faker.lorem.words(2),
  },
];

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      reviews,
    },
  };
};

interface Props {
  reviews: Array<{
    id: number;
    title: string;
    content: string;
    productId: number;
    productName: string;
  }>;
}

const ReviewsIndexPage: NextPage<Props> = ({ reviews }) => {
  return (
    <>
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <li key={review.id}>
          <h3>{review.title}</h3>
          <div>
            <p>
              {review.id} - {review.productId}
            </p>
            <p>{review.content}</p>
            <Link
              href={`/items/${review.productId}/${review.productName.replaceAll(" ", "-")}`}
            >
              <a>{review.productName}</a>
            </Link>
          </div>
        </li>
      ))}
    </>
  );
};

export default ReviewsIndexPage;

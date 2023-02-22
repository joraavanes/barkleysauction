import Link from "next/link";
import { faker } from "@faker-js/faker";
import { GetStaticProps, NextPage } from "next";

const reviews = [
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: {
      id: '63453023667f61c23a284354',
      name: faker.commerce.product(),
    }
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: {
      id: '63453023667f61c23a284354',
      name: faker.commerce.product(),
    }
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: {
      id: '6353bd5f1056350c27c548b7',
      name: faker.commerce.product(),
    }
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: {
      id: '63553ba4c2e3d68b364242b6',
      name: faker.commerce.product(),
    }
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
    productId: {
      id: number;
      name: string;
    }
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
              {review.id} - {review.productId.name}
            </p>
            <p>{review.content}</p>
            <Link href={`/reviews/${review.id}/${review.title.replaceAll(" ", "-")}`}>Read Review</Link>
            <div>
              <b>Product Info: </b>
              <Link
                href={`/items/${review.productId.id}/${review.productId.name.replaceAll(" ", "-")}`}
              >
                <a>{review.productId.name}</a>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default ReviewsIndexPage;

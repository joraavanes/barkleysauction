import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { faker } from "@faker-js/faker";

const reviews = [
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: {
      id: "63453023667f61c23a284354",
      name: faker.commerce.product(),
    },
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: {
      id: "63453023667f61c23a284354",
      name: faker.commerce.product(),
    },
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: {
      id: "6353bd5f1056350c27c548b7",
      name: faker.commerce.product(),
    },
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: {
      id: "63553ba4c2e3d68b364242b6",
      name: faker.commerce.product(),
    },
  },
];

interface Props {
  review: {
    id: number;
    title: string;
    content: string;
    productId: {
      id: number;
      name: string;
    };
  };
}

const ReviewPageWithSlug: NextPage<Props> = ({ review }) => {
  return (
    <>
      <h2>{review.title}</h2>
      <h4>{review.productId.name}</h4>
      <hr />
      <p>{review.content}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps = (context) => {
  const review = reviews[0];

  return {
    props: {
      review,
    },
  };
};

export const getStaticPaths: GetStaticPaths = (context) => {
  const paths = reviews.map((review) => ({
    params: {
      slug: [review.id, review.title],
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default ReviewPageWithSlug;

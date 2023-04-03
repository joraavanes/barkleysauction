import { faker } from "@faker-js/faker";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const reviews = [
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: "63453023667f61c23a284354",
    productName: faker.lorem.words(2),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: "63453023667f61c23a284354",
    productName: faker.lorem.words(2),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: "6353bd5f1056350c27c548b7",
    productName: faker.lorem.words(2),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(4),
    content: faker.lorem.sentences(4),
    productId: "63553ba4c2e3d68b364242b6",
    productName: faker.lorem.words(2),
  },
];

interface Props {
  review: {
    id: number;
    title: string;
    content: string;
    productId: number;
    productName: string;
  };
}

const ReviewSlugPage: NextPage<Props> = ({ review }) => {
  return (
    <>
      <h4>Reviews</h4>
      <h2>{review.title}</h2>
      <h3>{review.productName}</h3>
      <hr />
      <p>{review.content}</p>
      
    </>
  );
};

export const getStaticProps: GetStaticProps = (context) => {
  console.log(context.params);
  const review = reviews[0];

  return {
    props: {
      review,
    },
    revalidate: 360000,
  };
};

export const getStaticPaths: GetStaticPaths = (context) => {
  const paths = reviews.map((review) => ({
    params: {
      id: review.id,
      slug: [review.id, review.title.replaceAll(" ", "-")],
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default ReviewSlugPage;

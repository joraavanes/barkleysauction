import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface props {
  categorySlug: string;
}

const CategoryPage: NextPage<props> = ({ categorySlug }) => {
  return (
    <div>
      <h1>
        {categorySlug.charAt(0).toUpperCase() +
          categorySlug.slice(1).replaceAll("-", " ")}
      </h1>
      <p>
        <Link href={"/"}>
          <a href="/">Barkley's</a>
        </Link>
        {" > "}
        <Link href={`/items/${categorySlug}`}>
          <a href={`/items/${categorySlug}`}>
            {categorySlug.replaceAll("-", " ")}
          </a>
        </Link>
      </p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const categorySlug = context.params?.categorySlug;

  return {
    props: {
      categorySlug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { categorySlug: "furniture-&-appliances" } }],
    fallback: false,
  };
};

export default CategoryPage;

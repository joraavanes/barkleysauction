import Head from "next/head";

interface Layout {
  children?: JSX.Element[] | JSX.Element;
}

const MainLayout: React.FC<Layout> = ({ children }) => {
  return (
    <main>
      <Head>
        <title>Barkely&apos;s Auction</title>
      </Head>
      {children}
    </main>
  );
};

export default MainLayout;

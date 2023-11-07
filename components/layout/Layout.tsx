import Head from "next/head";

interface Layout {
  children?: JSX.Element[] | JSX.Element;
}

const MainLayout: React.FC<Layout> = ({ children }) => {
  return (
    <main>
      <Head>
        <title>Barkely&apos;s Auction</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      </Head>
      {children}
    </main>
  );
};

export default MainLayout;

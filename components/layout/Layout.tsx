import Head from "next/head";
import Navigation from "./Navigation";

interface Layout {
  children?: JSX.Element[] | JSX.Element;
}

const MainLayout: React.FC<Layout> = ({ children }) => {
  return (
    <main>
      <Head>
        <title>Barkely&apos;s Auction</title>
      </Head>
      <Navigation />
      {children}
    </main>
  );
};

export default MainLayout;

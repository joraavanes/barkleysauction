import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Barkley&apos;s Auction | Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Barkley&apos;s Auction</a>
        </h1>

        <p className={styles.description}>
          Get started by surfing the listings
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          rel="noopener noreferrer"
        >
          Powered by Barkley&apos;s
        </a>
      </footer>
    </div>
  );
};

export default Home;

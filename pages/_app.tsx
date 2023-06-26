import "../styles/globals.css";
import "reflect-metadata";
import { NextPage } from "next";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import NextProgress from "nextjs-progressbar";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../components/layout/Layout";
import { ErrorBoundary } from "../components/shared/";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  return getLayout(
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <NextProgress color="#F91890" />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MyApp;

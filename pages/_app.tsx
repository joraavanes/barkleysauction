import "reflect-metadata";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { NextPage } from "next";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import NextProgress from "nextjs-progressbar";
import { ReactElement, ReactNode, useEffect } from "react";
import MainLayout from "@/components/layout/Layout";
import { ErrorBoundary } from "@/components/shared/";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return getLayout(
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <NextProgress
          color="#101e8e"
          height={3}
        />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MyApp;

import "reflect-metadata";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../styles/globals.css";
import { NextPage } from "next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import NextProgress from "nextjs-progressbar";
import MainLayout from "@/components/layout/Layout";
import Navigation from "@/components/layout/Navigation";
import { ErrorBoundary } from "@/components/shared/";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  navigation?: ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
};

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps, session }: AppPropsWithLayout) {
  const PageNavigation = Component.navigation ?? <Navigation />;
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return getLayout(
    <ErrorBoundary>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <NextProgress color="#101e8e" height={3} />
          {PageNavigation}
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default MyApp;

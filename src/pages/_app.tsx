import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Appshell from "@/components/layout/Appshell";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Appshell>
        <Component {...pageProps} />
      </Appshell>
    </SessionProvider>
  );
}

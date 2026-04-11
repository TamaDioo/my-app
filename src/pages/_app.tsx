import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Appshell from "@/components/layout/Appshell";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      {/* Menambahkan Script External Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-S9JRWP95D0`}
        strategy="afterInteractive"
      />
      {/* Menambahkan Script Internal (Inline) untuk inisialisasi GA */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-S9JRWP95D0');
        `}
      </Script>
      <SessionProvider session={pageProps.session}>
        <Appshell>
          <Component {...pageProps} />
        </Appshell>
      </SessionProvider>
    </>
  );
}

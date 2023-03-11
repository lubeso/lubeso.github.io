import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import License from "./license";

export function Layout(props: { children?: ReactNode }): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Luis Becerra Solis</title>
      </Head>
      <header className="flex flex-row flex-wrap items-center justify-center space-y-2 p-4 text-center">
        <Link href="/">
          <h1 className="text-3xl font-bold">Luis Becerra Solis</h1>
        </Link>
      </header>
      <main className="flex flex-1 flex-col flex-nowrap items-stretch justify-start overflow-scroll">
        {props.children}
      </main>
      <footer className="flex flex-col flex-nowrap items-center justify-center">
        <License />
      </footer>
    </>
  );
}

import * as React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css'

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
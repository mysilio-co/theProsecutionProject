import Head from 'next/head'
import '../styles/globals.css'

import 'tailwindcss/tailwind.css'
const _ = require('lodash');

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>The Prosecution Project</title>
      <link rel="shortcut icon" href="/favicon.png"></link>
    </Head>

    <Component {...pageProps} />
  </>
}

export default MyApp

import Head from 'next/head'
import '../styles/globals.css'

import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>The Prosecution Project</title>

    </Head>

    <Component {...pageProps} />
  </>
}

export default MyApp

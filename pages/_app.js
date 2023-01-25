import Head from 'next/head'
import '../styles/globals.css'

import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>The Prosecution Project</title>
      <link rel="shortcut icon" href="https://theprosecutionproject.org/wp-content/uploads/2020/08/tPP-4.png"></link>
    </Head>

    <Component {...pageProps} />
  </>
}

export default MyApp

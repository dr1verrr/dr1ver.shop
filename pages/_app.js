import React, { useEffect } from 'react'
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  useEffect(() => (document.documentElement.lang = 'en-us'), [])

  return (
    <React.Fragment>
      <Head>
        <title>Next.js app</title>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp

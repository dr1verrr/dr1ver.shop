import React, { useEffect } from 'react'
import '../styles/globals.css'
import Head from 'next/head'
import { AuthProvider } from '../contexts/auth'

function MyApp({ Component, pageProps }) {
  useEffect(() => (document.documentElement.lang = 'en-us'), [])

  return (
    <React.Fragment>
      <Head>
        <title>Next.js app</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </React.Fragment>
  )
}

export default MyApp

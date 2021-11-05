import Head from 'next/head'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { AuthProvider } from '../contexts/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => (document.documentElement.lang = 'en-us'), [])

  return (
    <React.Fragment>
      <Head>
        <title>Next.js app</title>
      </Head>
      <Header />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </React.Fragment>
  )
}

export default MyApp

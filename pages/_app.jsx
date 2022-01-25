import Head from 'next/head'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import Header from '../components/Header'
import { AuthProvider } from '../contexts/auth'
import store from '../redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => (document.documentElement.lang = 'en-us'), [])

  return (
    <React.Fragment>
      <Head>
        <title>dr1ver.shop</title>
      </Head>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </React.Fragment>
  )
}

export default MyApp

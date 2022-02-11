import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import Footer from '../components/Footer'
import { AuthProvider } from '../contexts/auth'
import store from '../redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>dr1ver.shop</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
      </Head>

      {/*<AuthModal />*/}
      {/*<Cart />
        <Header />*/}
      <Provider store={store}>
        <main className='main'>
          <Component {...pageProps} />
        </main>
      </Provider>
      <Footer />
    </AuthProvider>
  )
}

export default MyApp

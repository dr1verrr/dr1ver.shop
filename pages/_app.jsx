import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import { Fragment, useEffect } from 'react'
import { Provider } from 'react-redux'
import Cart from '../components/Cart/Cart'
import Footer from '../components/Footer'
import Header from '../components/Header'
import AuthProvider from '../contexts/auth'
import store from '../redux/store'
import GlobalStyles from '../styles/GlobalStyles'
import '../styles/globals.css'
import ScrollRestorer from '../providers/ScrollRestorer'
import CartWrapper from '../components/Cart/CartWrapper'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps, router }) {
  return (
    <Fragment>
      <Head>
        <title>dr1ver.shop</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
      </Head>
      {/*<AuthModal />*/}
      <Provider store={store}>
        <GlobalStyles />
        <CartWrapper />
        <AuthProvider>
          <Header />
          <Layout router={router}>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </Provider>
      <Footer />
    </Fragment>
  )
}

export default MyApp

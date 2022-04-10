import Head from 'next/head'
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import AuthModal from '../components/AuthModal'
import Cart from '../components/Cart/CartWrapper'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Mask from '../components/Mask'
import Modal from '../components/Modal'
import AuthProvider from '../contexts/auth'
import store from '../redux/store'
import '../styles/globals.css'

//Fix window.scrollTo (in firefox it's not working)

function MyApp({ Component, pageProps, router }) {
  return (
    <Fragment>
      <Head>
        <title>dr1ver.shop — stickers shop by dr1verrr</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
      </Head>
      <Provider store={store}>
        <Mask />
        <Modal />
        <AuthProvider>
          <Cart />
          <AuthModal />
          <Header />
          <Layout>
            <Component {...pageProps} key={router.asPath} />
          </Layout>
        </AuthProvider>
      </Provider>
      <Footer />
    </Fragment>
  )
}

export default MyApp

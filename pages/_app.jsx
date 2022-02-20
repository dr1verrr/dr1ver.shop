import Head from 'next/head'
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import AuthModal from '../components/AuthModal'
import Cart from '../components/Cart/CartWrapper'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import ProductModal from '../components/ProductModal'
import AuthProvider from '../contexts/auth'
import store from '../redux/store'
import '../styles/globals.css'
import GlobalStyles from '../styles/GlobalStyles'
import ProgressBar from '../components/ProgressBar'

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
      <Provider store={store}>
        <GlobalStyles />
        <ProgressBar />
        <Modal />
        <ProductModal />
        <AuthModal />
        <Cart />
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

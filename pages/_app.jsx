import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import AuthProvider from '../contexts/auth'
import store from '../redux/store'
import '../styles/globals.css'

const Mask = dynamic(() => import('../components/Mask'))
const Modal = dynamic(() => import('../components/Modal'))
const Cart = dynamic(() => import('../components/Cart/CartWrapper'))
const AuthModal = dynamic(() => import('../components/AuthModal'))

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

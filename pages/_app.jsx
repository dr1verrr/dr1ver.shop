import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import { Fragment, useEffect } from 'react'
import { Provider } from 'react-redux'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Header from '../components/Header'
import AuthProvider from '../contexts/auth'
import store from '../redux/store'
import GlobalStyles from '../styles/GlobalStyles'
import '../styles/globals.css'
import ScrollRestorer from '../providers/ScrollRestorer'

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
        <Cart />
        <AuthProvider>
          <Header />
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.asPath}
              initial='pageInitial'
              animate='pageAnimate'
              exit='pageExit'
              variants={{
                pageInitial: {
                  opacity: 0,
                },
                pageAnimate: {
                  opacity: 1,
                },

                pageExit: {
                  opacity: 0,
                },
              }}
            >
              <main className='main'>
                <ScrollRestorer />
                <Component {...pageProps} />
              </main>
            </motion.div>
          </AnimatePresence>
        </AuthProvider>
      </Provider>
      <Footer />
      <style jsx>{`
        .main {
          position: relative;
          min-height: 100vh;
          height: 100%;
          margin-top: 0;
        }
      `}</style>
      <style jsx global>{`
        body {
          background: #000;
        }
      `}</style>
    </Fragment>
  )
}

export default MyApp

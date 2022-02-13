import Head from 'next/head'
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Header from '../components/Header'
import AuthProvider from '../contexts/auth'
import store from '../redux/store'
import '../styles/globals.css'
import GlobalStyles from '../styles/GlobalStyles'

function MyApp({ Component, pageProps }) {
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
          <main className='main'>
            <Component {...pageProps} />
          </main>
        </AuthProvider>
      </Provider>
      <Footer />
      <style jsx>{`
        .main {
          min-height: 100vh;
          height: 100%;
        }
      `}</style>
    </Fragment>
  )
}

export default MyApp

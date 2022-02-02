import Head from 'next/head'
import React from 'react'
import AuthModal from './AuthModal'
import Cart from './Cart'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  //const { popup, cartVisible, showModal, setShowModal } = useAuth()

  return (
    <React.Fragment>
      <Head>
        <title>dr1ver.shop</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
      </Head>
      <AuthModal />
      <Cart />

      <div className='wrapper'>
        <Header />
        <main className='main'>{children}</main>
        <Footer />
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main {
          flex: 1;
          min-height: 100vh;
        }
      `}</style>
    </React.Fragment>
  )
}

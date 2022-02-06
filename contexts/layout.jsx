import Head from 'next/head'
import { Router } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import AuthModal from '../components/AuthModal'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Modal from '../components/Modal'
import CartProvider from './cart'

const LayoutContext = createContext({})

export const useLayout = () => useContext(LayoutContext)

function LayoutProvider({ children }) {
  const [showModal, setShowModal] = useState({ visible: false, title: 'title', message: 'message' })
  const [popup, setPopup] = useState({ login: false, register: false })
  const [cartVisible, setCartVisible] = useState(false)

  const providedValues = { showModal, setShowModal, popup, setPopup, cartVisible, setCartVisible }

  useEffect(() => {
    scroll()
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    })
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>dr1ver.shop</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
      </Head>

      <AuthModal popup={popup} setPopup={setPopup} />

      <div className='wrapper'>
        <LayoutContext.Provider value={providedValues}>
          <Modal
            title={showModal.title}
            show={showModal.visible}
            message={showModal.message}
            onClose={() => {
              setShowModal(prev => ({ ...prev, visible: false }))
            }}
          >
            {showModal.message}
          </Modal>
          <div className='cart-mask' onClick={() => setCartVisible(false)}></div>
          <CartProvider>
            <div className='cart-provider-wrapper'>
              <Cart cartVisible={cartVisible} setCartVisible={setCartVisible} />
              <Header />
              <main className='main'>{children}</main>
            </div>
          </CartProvider>
          <Footer />
        </LayoutContext.Provider>
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          position: relative;
          flex-direction: column;
          min-height: 100vh;
        }

        .main {
          flex: 1;
          min-height: 100vh;
          height: 100%;
        }

        .cart-mask {
          position: absolute;
          content: '';
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background: #000;
          opacity: ${cartVisible ? 0.4 : 0};
          z-index: 1050;
          pointer-events: ${cartVisible ? 'all' : 'none'};
        }
      `}</style>
    </React.Fragment>
  )
}

export default LayoutProvider

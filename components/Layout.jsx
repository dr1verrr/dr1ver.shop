import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Head>
        <title>dr1ver.shop</title>
      </Head>
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
          min-height: 100vh;
          flex: 1;
        }
      `}</style>
    </React.Fragment>
  )
}

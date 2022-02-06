import React from 'react'
import { AuthProvider } from '../contexts/auth'
import Layout from '../contexts/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp

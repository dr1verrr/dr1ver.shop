import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { AuthProvider } from '../contexts/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => (document.documentElement.lang = 'en-us'), [])

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp

import React, { useEffect } from 'react'
import Layout from '../contexts/layout'
import { AuthProvider } from '../contexts/auth'
import '../styles/globals.css'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  useEffect(() => (document.documentElement.lang = 'en-us'), [])
  const router = useRouter()

  //useEffect(() => {
  //  console.log(router.pathname)
  //}, [router.pathname])

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp

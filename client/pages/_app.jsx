import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [render, setRender] = useState(false)
  const privateRoutes = ['/dashboard', '/profile', 'cart', '/settings']
  const authRoutes = ['/signin', '/signup']

  const routeCondition =
    authRoutes.includes(router.pathname) || privateRoutes.includes(router.pathname)

  useEffect(() => checkRoute(), [])

  function checkRoute() {
    if (!routeCondition) return setRender(true)

    if (routeCondition) {
      setRender(false)
      checkAuth()
    }
  }

  async function checkAuth() {
    try {
      setLoading(true)
      const user = await axios.get('/api/auth').then(res => res.data.user)
      const authRouteCondition = user && authRoutes.includes(router.pathname)
      const privateRouteCondition = !user && privateRoutes.includes(router.pathname)

      if (authRouteCondition) {
        router.replace('/').then(() => setRender(true))
      }

      if (privateRouteCondition) {
        router.replace('/signin').then(() => setRender(true))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) return <div style={{ fontSize: '5rem', textAlign: 'center' }}>Loading...</div>

  if (!isLoading && render) {
    return (
      <React.Fragment>
        <Head>
          <meta charset='utf-8' />
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    )
  }

  return null
}

export default MyApp

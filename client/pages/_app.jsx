import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => ifUserExists(), [])

  async function ifUserExists() {
    const privateRoutes = ['/dashboard', '/profile', 'cart', '/settings']
    const authRoutes = ['/signin', '/signup']
    try {
      setLoading(true)
      const user = await axios.get('/api/auth').then(res => res.data.user)
      if (user && authRoutes.includes(router.pathname)) {
        router.replace('/')
      }

      if (!user && privateRoutes.includes(router.pathname)) {
        router.replace('/signin')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return <React.Fragment>{!isLoading && <Component {...pageProps} />}</React.Fragment>
}

export default MyApp

import axios from 'axios'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { useEffect } from 'react'
import LoginComponent from '../components/loginComponent'
import { useAuth } from '../contexts/auth'

function Home() {
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    console.log(isAuthenticated, user)
  }, [isAuthenticated, user])

  return <div style={{ fontSize: '1.6rem' }}>Welcome {JSON.stringify(user, null, 2)}</div>
}

export default Home

import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth'
import api from '../config/api'

function Home() {
  const { isAuthenticated, user } = useAuth()
  const [products, Products] = useState([])

  useEffect(() => {
    console.log(isAuthenticated, user)
  }, [isAuthenticated, user])

  useEffect(() => {
    api.get('/products').then(res => res.data)
  }, [])

  return <div style={{ fontSize: '1.6rem' }}>Welcome {JSON.stringify(user, null, 2)}</div>
}

export default Home

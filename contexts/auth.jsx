import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import api from '../config/api'
import useRequest from '../hooks/useRequest'
import { CART_UPDATE } from '../redux/types'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const privateRoutes = ['/profile']
  const isPrivate = privateRoutes.includes(router.pathname)
  const getToken = useRequest()
  const dispatch = useDispatch()

  function checkRoute() {
    if (isPrivate && !loading && !user) {
      router.replace('/')
    }
  }

  useEffect(checkRoute, [router.pathname, user, loading])

  async function loadUserFromCookies(authType) {
    try {
      const token = await getToken('/api/token', { method: 'GET' }).then(res => res.data)

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`
        const { data: user } = await api.get('/users/me')

        if (user) {
          setUser(user)
          if (authType === 'login') dispatch({ type: CART_UPDATE, payload: { cartData: user.cartdata || [] } })
          return user
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadUserFromCookies().then(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        setUser,
        loading,
        setLoading,
        loadUserFromCookies,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)

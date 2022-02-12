import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../config/api'
import useRequest from '../hooks/useRequest'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const privateRoutes = ['/profile']
  const isPrivate = privateRoutes.includes(router.pathname)
  const getToken = useRequest()

  function checkRoute() {
    if (isPrivate && !loading && !user) {
      router.replace('/')
    }
  }

  useEffect(() => {
    console.log(children)
  }, [])

  useEffect(checkRoute, [router.pathname, user, loading])

  async function loadUserFromCookies() {
    try {
      const token = await getToken('/api/token', { method: 'GET' }).then(res => res.data)

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`
        const { data: user } = await api.get('/users/me')
        if (user) setUser(user)
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

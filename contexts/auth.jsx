import axios from 'axios'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../config/api'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const privateRoutes = ['/profile']
  const privateCondition = privateRoutes.includes(router.pathname)

  function checkRoute() {
    if (privateCondition && !loading && !user) {
      router.replace('/')
    }
  }

  useEffect(checkRoute, [router.pathname, user, loading])

  async function loadUserFromCookies() {
    try {
      const token = await axios.get('/api/token').then(res => res.data)

      if (token) {
        //console.log("Got a token in the cookies, let's see if it is valid")
        api.defaults.headers.Authorization = `Bearer ${token}`
        const { data: user } = await api.get('/users/me')
        if (user) setUser(user)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadUserFromCookies()
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

export const useAuth = () => useContext(AuthContext)

import axios from 'axios'
import { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'

export default function Profile(req, res) {
  const [userData, setUserData] = useState({})
  useEffect(() => axios.get('/api/auth').then(res => setUserData(res.data)), [req.user])

  return userData ? <Dashboard userData={userData} /> : null
}

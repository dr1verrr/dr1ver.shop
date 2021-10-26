import axios from '../axios/config'
import { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'

export async function getServerSideProps(ctx) {
  const user = ctx.req.cookies.user
  if (user) JSON.parse(user)

  return {
    props: { user: user || null },
  }
}

export default function Profile(req, res) {
  const [userData, setUserData] = useState({})
  useEffect(
    () =>
      req.user &&
      axios.get('/api/user', { withCredentials: true }).then(result => setUserData(result.data)),
    [req.user]
  )

  useEffect(() => {
    console.log(userData)
  }, [userData])

  return userData ? <Dashboard userData={userData} /> : null
}

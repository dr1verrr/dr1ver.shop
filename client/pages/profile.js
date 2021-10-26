import { useState } from 'react'
import Dashboard from '../components/Dashboard'

export async function getServerSideProps(ctx) {
  const cookies = ctx.req.cookies
  const user = cookies.user && JSON.parse(cookies.user)

  return {
    props: { user: user || null },
  }
}

export default function Profile(req, res) {
  const [userData, setUserData] = useState(req.user)
  return userData ? <Dashboard userData={userData} /> : null
}

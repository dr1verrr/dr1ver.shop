import Dashboard from '../components/Dashboard'
import { useAuth } from '../contexts/Auth.context'

export default function Profile(req, res) {
  const { auth } = useAuth()
  console.log(auth)

  if (auth.status === 'SIGNED_OUT') return <div>User not authorized</div>
  return <Dashboard auth={auth} />
}

import Dashboard from '../components/Dashboard'
import { useAuth } from '../contexts/Auth.context'

export default function Profile(req, res) {
  const { auth } = useAuth()

  if (auth.status === 'SIGNED_OUT') {
    return null
  } else {
    return <Dashboard auth={auth} />
  }
}

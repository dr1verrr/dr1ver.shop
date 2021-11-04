import { useRouter } from 'next/router'
import axios from 'axios'

const Profile = props => {
  const router = useRouter()

  async function logout() {
    try {
      await axios.get('/api/logout')
      router.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div>Username: {}</div>
      <div>Email: {}</div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile

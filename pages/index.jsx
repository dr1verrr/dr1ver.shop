import { useRouter } from 'next/router'
import axios from 'axios'
import nookies from 'nookies'
import LoginComponent from '../components/loginComponent'

function Home() {
  const router = useRouter()
  function goToRegister() {
    router.push('/register')
  }

  return (
    <div>
      <LoginComponent />
      <button onClick={goToRegister}>Register</button>
    </div>
  )
}

export const getServerSideProps = async ctx => {
  const cookies = nookies.get(ctx)
  let user = null

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
      user = data
    } catch (e) {
      console.log(e)
    }
  }

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/profile',
      },
    }
  }

  return {
    props: {},
  }
}

export default Home

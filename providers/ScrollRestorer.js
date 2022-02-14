import { useRouter } from 'next/router'
import { useScrollRestoration } from '../hooks/useScrollRestoration'

const ScrollRestorer = () => {
  const router = useRouter()

  useScrollRestoration(router)

  return null
}

export default ScrollRestorer

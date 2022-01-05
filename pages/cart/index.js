import { useDispatch, useSelector } from 'react-redux'

export default function Cart() {
  const cartItems = useSelector(state => state)

  return <div>{JSON.stringify(cartItems)}</div>
}

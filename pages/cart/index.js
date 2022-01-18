import useLocalStorage from '../../hooks/useLocalStorage'

export default function Cart() {
  const [cartData] = useLocalStorage('cart-data')

  return <div>{JSON.stringify(cartData)}</div>
}

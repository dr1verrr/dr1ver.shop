import { useDispatch, useSelector } from 'react-redux'

export default function Cart() {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)

  return <div>{JSON.stringify(selector)}</div>
}

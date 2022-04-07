/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/dist/client/router'
import Products from '../../components/Products'

const Category = () => {
  const { query } = useRouter()

  return <Products slug={query.slug} ctgName={query.name} />
}

export default Category

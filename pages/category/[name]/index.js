/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Product from '../../../components/Product'
import api from '../../../config/api'

function Category(props) {
  const router = useRouter()
  const { name } = router.query
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!!name) api.get(`/categories/${name}`).then(res => setProducts(res.data))
  }, [name])

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <React.Fragment>
      <div style={{ textAlign: 'center', fontSize: '4rem', padding: '4rem 0' }}>{products?.name}</div>
      <Product products={products.products} />
    </React.Fragment>
  )
}

export default Category

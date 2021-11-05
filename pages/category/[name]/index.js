/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ContainerStyled } from '../../../components/Container.styled'
import Product from '../../../components/Product'
import api from '../../../config/api'

function Category(props) {
  const router = useRouter()
  const { name } = router.query
  const [products, setProducts] = useState([])

  useEffect(() => {
    !!name && api.get(`/categories/${name}`).then(res => setProducts(res.data))
  }, [name])

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <React.Fragment>
      <h1 style={{ textAlign: 'center' }}>{products?.name}</h1>
      <Product products={products.products} />
    </React.Fragment>
  )
}

export default Category

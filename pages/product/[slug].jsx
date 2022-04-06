/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from 'next/router'
import React from 'react'
import ProductPage from '../../components/Product'

const ProductPageWrapper = () => {
  const { query } = useRouter()

  return <ProductPage slug={query.slug} />
}

export default ProductPageWrapper

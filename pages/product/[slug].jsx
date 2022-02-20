/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Product from '../../components/Product'
import { getProduct } from '../api/product'

export default function ProductPage({ product }) {
  return <Product product={product} />
}

export async function getServerSideProps(context) {
  try {
    const product = await getProduct(context)

    return {
      props: {
        ...product,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Product from '../../components/Product'
import { getProduct } from '../api/product'

export default function ProductPage({ product, categories }) {
  return <Product product={product} categories={categories} />
}

export async function getServerSideProps(context) {
  try {
    const product = await getProduct(context)

    return {
      props: {
        product: product.product,
        categories: product.categories,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

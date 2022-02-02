/* eslint-disable react-hooks/exhaustive-deps */
import fetch from 'isomorphic-fetch'
import React from 'react'
import Products from '../../components/Products'

function Category({ products }) {
  return (
    <React.Fragment>
      <h2 style={{ textAlign: 'center', fontSize: '3.5rem', padding: '1rem 0 3rem 0', fontWeight: 400 }}>
        {products?.name}
      </h2>
      {products && <Products products={products.products} />}
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${context.params.slug}`)
  const data = await res.json()

  return {
    props: {
      products: data,
    },
  }
}

export default Category

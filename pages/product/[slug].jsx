/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import ProductPage from '../../components/Product'

const productPage = ({ slug }) => {
  return <ProductPage slug={slug} />
}

export default productPage

export async function getServerSideProps(context) {
  try {
    return {
      props: {
        slug: context.params.slug,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

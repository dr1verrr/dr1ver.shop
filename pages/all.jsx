import React from 'react'
import Products from '../components/Products'
import api from '../config/api'

function AllProducts({ products }) {
  return (
    <React.Fragment>
      <Products products={products} />
      <style jsx>{`
        h2 {
          margin: 0;
        }

        h2 {
          padding: 3rem 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export const getStaticProps = async ctx => {
  const response = await api.get('/products').then(res => res.data)

  return {
    props: {
      products: response,
    },
  }
}

export default AllProducts

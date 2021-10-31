import React from 'react'
import TableRow from './TableRow'

export default function Table({ products, productKeys }) {
  return products?.map((item, index) => (
    <TableRow originalRow={item} key={item.product_id} productKeys={productKeys} index={index} />
  ))
}

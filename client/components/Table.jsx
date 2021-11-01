import React, { useState } from 'react'
import TableRow from './TableRow'
import styles from './Table.module.css'

export default function Table({ products, productKeys }) {
  const [total, setTotal] = useState([])

  return (
    <form onSubmit={e => e.preventDefault()}>
      <table className={styles.table}>
        <thead style={{ fontSize: '1.6rem' }}>
          <tr>
            <td>#</td>
            {productKeys?.map(item => {
              return <td key={item}>{item}</td>
            })}
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => (
            <TableRow originalRow={item} key={item.product_id} productKeys={productKeys} index={index} total={total} />
          ))}
        </tbody>
      </table>
    </form>
  )
}

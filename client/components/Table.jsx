import React, { useState } from 'react'
import TableRow from './TableRow'

export default function Table({ products, productKeys }) {
  const [total, setTotal] = useState({})

  return (
    <React.Fragment>
      <form>
        <table className='table'>
          <thead>
            <tr>
              <td>#</td>
              {productKeys?.map(item => {
                return <td key={item}>{item}</td>
              })}
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <TableRow
                originalRow={item}
                key={item.product_id}
                productKeys={productKeys}
                index={index}
                total={total}
              />
            ))}
          </tbody>
        </table>
      </form>
      <style jsx>
        {`
          .table {
            width: 100%;

            margin-bottom: 20px;

            border: 1px solid #dddddd;

            border-collapse: collapse;
          }

          .table th {
            font-weight: bold;

            padding: 5px;

            background: #efefef;

            border: 1px solid #dddddd;
          }

          .table td {
            border: 1px solid #dddddd;

            padding: 5px;
          }
        `}
      </style>
    </React.Fragment>
  )
}

import React, { useEffect, useState } from 'react'
import TableColumn from './TableColumn'

function TableRow({ originalRow, productKeys, index }) {
  const [row, setRow] = useState(originalRow)

  //useEffect(() => {
  //  console.log(row)
  //}, [row])

  //useEffect(() => {
  //  setRow(originalRow)
  //}, [originalRow])

  return (
    <tr>
      <td>{index}</td>
      {Object.values(originalRow).map((data, index) => {
        return (
          <TableColumn
            key={data}
            originalColumn={data}
            originalRow={originalRow}
            row={{ state: row, setRow }}
            inputProps={{ productKeys, index }}
          />
        )
      })}
    </tr>
  )
}

export default TableRow

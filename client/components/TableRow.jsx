import React, { useEffect, useState } from 'react'

const TableRow = ({ originalRow, children }) => {
  const [row, setRow] = useState(originalRow)

  useEffect(() => {
    console.log(row)
  }, [row])

  useEffect(() => {
    setRow(originalRow)
  }, [originalRow])
  return (
    <React.Fragment>
      <tr>{children}</tr>
    </React.Fragment>
  )
}

export default TableRow

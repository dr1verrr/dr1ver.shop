import React, { useEffect, useState } from 'react'
import TableColumn from './TableColumn'
import styles from './Table.module.css'

export default function TableRow({ originalRow, productKeys, index, total }) {
  const [row, setRow] = useState(originalRow)
  const [newRow, setNewRow] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [isUnsaved, setUnsaved] = useState(false)
  const [toSave, setToSave] = useState(false)

  useEffect(() => {
    console.log(newRow)
  }, [newRow])

  return (
    <tr style={{ borderBottom: '1px solid #999' }} className={styles.focus}>
      <td>{index}</td>
      {Object.values(originalRow).map((data, index) => {
        return (
          <TableColumn
            key={data}
            originalColumn={data}
            originalRow={originalRow}
            row={{ state: row, newRow, setNewRow, toSave, isUnsaved }}
            inputProps={{ productKeys, index, editMode, setUnsaved }}
          />
        )
      })}
      <td style={{ display: 'flex', flexDirection: 'column' }}>
        <button
          type={styles.button}
          style={{
            padding: '1rem',
            border: '1px solid #999',
            borderRadius: '1rem',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            margin: '0.25rem',
            display: 'block',
          }}
          onClick={() => setEditMode(prev => !prev)}
        >
          Edit
        </button>
        <button
          type={styles.button}
          style={{
            padding: '1rem',
            border: '1px solid #999',
            borderRadius: '1rem',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            margin: '0.25rem',
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

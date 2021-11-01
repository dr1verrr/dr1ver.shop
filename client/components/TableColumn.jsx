import React, { useEffect, useRef, useState } from 'react'

export default function TableColumn({
  originalColumn,
  originalRow,
  row: { state, setNewRow, toSave, isUnsaved },
  inputProps: { productKeys, index, editMode, setUnsaved },
}) {
  const [column, setColumn] = useState(originalColumn)
  const [newColumn, setNewColumn] = useState(originalColumn)

  function handleChange(e) {
    if (editMode) {
      setNewColumn(() => ({
        [e.target.name]: e.target.value,
      }))
    }
  }

  useEffect(() => {
    console.log(newColumn)
  }, [newColumn])

  useEffect(() => {
    if (isUnsaved && toSave) {
      //setNewRow(newColumn)
      setNewRow(prev => [...prev, newColumn])
    }
  }, [newColumn, toSave, isUnsaved])

  useEffect(() => {
    if ((editMode && newColumn !== column) || newColumn[productKeys[index]] !== column) {
      setUnsaved(true)
      setTimeout(() => setUnsaved(false))
    } else {
      setUnsaved(false)
    }
  }, [column, newColumn])

  return (
    <td>
      <input
        key={productKeys[index]}
        value={editMode ? newColumn[productKeys[index]] : column}
        name={productKeys[index]}
        onChange={handleChange}
        style={{ padding: '1rem', border: '1px solid #999' }}
      />
    </td>
  )
}

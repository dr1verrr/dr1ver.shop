const pool = require('../db').pool

// api/products/
exports.addProduct = async (req, res) => {
  try {
    const { description } = req.body
    const newProduct = await pool.query(
      'INSERT INTO product (description) VALUES($1) RETURNING *',
      [description]
    )

    res.json(newProduct.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

exports.getProducts = async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM product')
    res.json(allProducts.rows)
  } catch (err) {
    console.error(err.message)
  }
}

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await pool.query('SELECT * FROM product WHERE product_id = $1', [id])
    res.json(product.rows[0])
    return res.status(200).json({ response })
  } catch (err) {
    console.error(err.message)
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { description } = req.body
    const { id } = req.params
    const updateProduct = await pool.query(
      'UPDATE product SET description = $1 WHERE product_id = $2',
      [description, id]
    )
    res.send('Product was updated!')
  } catch (err) {
    console.error(err.message)
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await pool.query('DELETE FROM product WHERE product_id = $1', [id])
    res.send('Product was deleted')
  } catch (err) {
    console.error(err.message)
  }
}

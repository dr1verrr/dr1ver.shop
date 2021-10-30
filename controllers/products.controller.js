const pool = require('../db').pool

// api/products/

exports.addProduct = async (req, res) => {
  try {
    const { description, price, name, category } = req.body
    const newProduct = await pool.query(
      'INSERT INTO product (description, price, name, category) VALUES($1,$2,$3,$4) RETURNING *',
      [description, price, name, category]
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
  } catch (err) {
    console.error(err.message)
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { description, name, price, category } = req.body

    if (description) {
      await pool.query('UPDATE product SET description = $1 WHERE product_id = $2', [
        description,
        id,
      ])
    }

    if (name) {
      await pool.query('UPDATE product SET name = $1 WHERE product_id = $2', [name, id])
    }
    if (price) {
      await pool.query('UPDATE product SET price = $1 WHERE product_id = $2', [price, id])
    }
    if (category) {
      await pool.query('UPDATE product SET category = $1 WHERE product_id = $2', [category, id])
    }

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

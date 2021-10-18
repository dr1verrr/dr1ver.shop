if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const port = 5000
const pool = require('./db').pool

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:3000' }))

app.get('/', async (req, res) => {
  res.send('Hey yoh!')
})

//create a product

app.post('/products', async (req, res) => {
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
})

//get all products

app.get('/products', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM product')
    res.json(allProducts.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//get a product

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await pool.query('SELECT * FROM product WHERE product_id = $1', [id])
    res.json(product.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

//update a product
app.put('/products/:id', async (req, res) => {
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
})
//delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await pool.query('DELETE FROM product WHERE product_id = $1', [id])
    res.send('Product was deleted')
  } catch (err) {
    console.error(err.message)
  }
})

//Registration Function

app.post('/users/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [email]) //Checking if user already exists
    const arr = data.rows
    if (arr.length !== 0) {
      return res.status(400).json({
        error: 'Email already there, No need to register again.',
      })
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: 'Server error',
          })
        const user = {
          firstName,
          lastName,
          email,
          password: hash,
        }
        let flag = 1

        pool.query(
          `INSERT INTO users (firstname, lastname, email, password) VALUES ($1,$2,$3,$4);`,
          [user.firstName, user.lastName, user.email, user.password],
          err => {
            if (err) {
              flag = 0 //If user is not inserted is not inserted to database assigning flag as 0/false.
              console.error(err)
              return res.status(500).json({
                error: 'Database error',
              })
            } else {
              flag = 1
              res.status(200).send({ message: 'User added to database, not verified' })
            }
          }
        )
        if (flag) {
          const token = jwt.sign(
            //Signing a jwt token
            {
              email: user.email,
            },
            process.env.PRIVATE_KEY
          )
          console.log(token)
        }
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: 'Database error while registring user!', //Database connection error
    })
  }
})

//Login Function
app.post('/users/signin', async (req, res) => {
  const { email, password } = req.body
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [email])
    const user = data.rows
    if (user.length === 0) {
      res.status(400).json({
        error: 'User is not registered, Sign Up first',
      })
    } else {
      console.log(user[0])
      bcrypt.compare(password, user[0].password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: 'Server error',
          })
        } else if (result) {
          //Checking if credentials match
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY,
            {
              algorithm: 'RS256',
              expiresIn: '3 days',
            }
          )
          res.status(200).json({
            message: 'User signed in!',
            token: token,
          })
        } else {
          //Declaring the errors
          if (!result)
            res.status(400).json({
              error: 'Enter correct password!',
            })
        }
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: 'Database error occurred while signing in!', //Database connection error
    })
  }
})

app.listen(port, () => {
  console.log(`Here we go, Engines started at ${port}`)
})

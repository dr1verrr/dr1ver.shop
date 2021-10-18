require('dotenv').config()
//const bcrypt = require('bcrypt')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const pool = require('./db').pool
//const session = require('express-session')
//const flash = require('express-flash')
//const passport = require('passport')

//const initializePassport = require('./passportConfig')

//initializePassport(passport)

//app.set('view engine', 'ejs')
//middleware
app.use(express.urlencoded({ extended: false }))
//app.use(
//  session({
//    secret: 'secret',
//    resave: false,
//    saveUninitialized: false,
//  })
//)

//app.use(passport.initialize())
//app.use(passport.session())
//app.use(flash())
app.use(cors())
app.use(express.json())

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

//app.get('/users/register', checkAuthenticated, (req, res) => {
//  res.render('register')
//})

//app.get('/users/login', checkAuthenticated, (req, res) => {
//  res.render('login')
//})

//////////////////////////

//app.get('/users/logout', async (req, res) => {
//  req.logOut()
//  req.flash('success_msg', 'You have logged out')
//  res.redirect('/users/login')
//})

//app.get('/users/dashboard', checkNotAuthenticated, (req, res) => {
//  res.render('dashboard', { user: req.user.username })
//})

//app.post('/users/register', async (req, res) => {
//  try {
//    const { username, email, password } = req.body
//    console.log({
//      username,
//      email,
//      password,
//    })

//    const errors = []

//    if (!username || !email || !password) {
//      errors.push({ message: 'All fields are required' })
//    }

//    if (password.length < 6) {
//      errors.push({ message: 'Password should be at least 6 characters long' })
//    }

//    if (errors.length > 0) {
//      res.json({ errors })
//    } else {
//      const hashedPassword = await bcrypt.hash(password, 10)
//      console.log(hashedPassword)

//      pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
//        if (err) throw err
//        console.log(results.rows)

//        if (results.rows.length > 0) {
//          errors.push({ message: 'Email already registered' })
//          res.json(errors)
//        } else {
//          pool.query(
//            `INSERT INTO users (username, email, password)
//          VALUES ($1, $2, $3)
//          RETURNING id, password`,
//            [username, email, hashedPassword],
//            (err, results) => {
//              if (err) throw err
//              console.log(results.rows)
//              //req.flash('success_msg', 'You are now registered. Please log in')
//              //res.redirect('/users/login')
//            }
//          )
//        }
//      })
//    }
//  } catch (err) {
//    console.error(err)
//  }
//})

//app.post(
//  '/users/login',
//  passport.authenticate('local', {
//    successRedirect: '/users/dashboard',
//    failureRedirect: '/users/login',
//    failureFlash: true,
//  })
//)

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/dashboard')
  }
  next()
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/users/login')
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

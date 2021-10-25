if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

require('./routes/auth.routes')(app)
require('./routes/products.routes')(app)
require('./routes/user.routes')(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

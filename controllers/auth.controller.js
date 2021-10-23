const pool = require('../db').pool
const bcrypt = require('bcrypt')
const uuid = require('uuid').v5
// api/auth
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const data = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]) //Checking if user already exists
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

        pool.query(
          `INSERT INTO users (firstname, lastname, email, password) VALUES ($1,$2,$3,$4);`,
          [user.firstName, user.lastName, user.email, user.password],
          err => {
            if (err) {
              return res.status(500).json({
                error: 'Database error',
              })
            } else {
              res.status(200).send({ message: 'User added to database, not verified' })
            }
          }
        )
      })
    }
  } catch (err) {
    res.status(500).json({
      error: 'Database error while registring user!', //Database connection error
    })
  }
}

exports.signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const data = await pool.query(
      `SELECT id, user_type_id, password FROM users WHERE email = $1;`,
      [email]
    )
    const user = data.rows[0]
    console.log(user)

    if (!user) {
      res.status(400).json({
        error: 'User is not registered, Sign Up first',
      })
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: 'Server error',
          })
        } else if (result) {
          const sessionId = uuid(`${user.id + email}`, 'ad06a31b-0b41-4bff-8a49-55fd3e17bdf4')

          pool.query(
            'UPDATE users SET session_id = $1 WHERE email = $2;',
            [sessionId, email],
            (err, result) => {
              if (err) {
                console.error(err)
                res.send(err)
              }

              if (result) {
                res.cookie(
                  'user',
                  JSON.stringify({ id: user.id, email, sessionId, userTypeId: user.user_type_id }),
                  {
                    httpOnly: true,
                    secure: false,
                    expires: new Date(Date.now() + 60 * 24 * 3600000),
                  }
                )
                res.send({ id: user.id, email, sessionId, userTypeId: user.user_type_id })
              }
            }
          )
        } else {
          if (!result)
            res.status(401).json({
              error: 'Enter correct password!',
            })
        }
      })
    }
  } catch (err) {
    res.status(500).json({
      error: 'Database error occurred while signing in!', //Database connection error
    })
  }
}

exports.logout = async (req, res) => {
  const { sessionId, email } = req.cookies.user

  try {
    pool.query(
      'UPDATE users SET session_id = $1 WHERE email = $2, session_id = $3;',
      [null, email, sessionId],
      (err, result) => {
        if (err) {
          console.error(err)
          res.send(err)
        }

        if (result) res.clearCookie('sid')
      }
    )
  } catch (err) {
    console.error(err)
    res.send(err)
  }
}

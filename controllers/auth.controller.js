const pool = require('../db').pool
const bcrypt = require('bcrypt')
const uuid = require('uuid').v5
// api/auth
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const data = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email])
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

        const timeCreated = new Date(Date.now())

        pool.query(
          `INSERT INTO users (firstname, lastname, email, password, createdat) VALUES ($1,$2,$3,$4,$5);`,
          [user.firstName, user.lastName, user.email, user.password, timeCreated],
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
      error: 'Database error while registring user!',
    })
  }
}

exports.signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const data = await pool.query(
      `SELECT id, user_type_id, password, firstname, lastname, createdat FROM users WHERE email = $1;`,
      [email]
    )
    const user = data.rows[0]

    if (!user) {
      res.status(400).json({
        error: 'User is not registered, Sign Up first',
      })
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).json({
            error: 'Server error',
          })
        } else if (result) {
          const sessionId = uuid(
            `${user.id + email + Date.now() + Math.random()}`,
            process.env.SESS_NAMESPACE
          )

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
                  JSON.stringify({
                    id: user.id,
                    email,
                    sessionId,
                    userTypeId: user.user_type_id,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    timeCreated: user.createdat,
                    signedIn: new Date(Date.now()),
                  }),
                  {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    expires: new Date(Date.now() + 60 * 24 * 7200),
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
      error: 'Database error occurred while signing in!',
    })
  }
}

exports.logout = async (req, res) => {
  const user = req.cookies.user
  const parsed = user && JSON.parse(user)

  console.log(parsed)

  try {
    pool.query(
      'UPDATE users SET session_id = $1 WHERE email = $2 AND session_id = $3;',
      [null, parsed.email, parsed.sessionId],
      (err, result) => {
        if (err) {
          console.error(err)
          res.send(err)
        }
      }
    )
    res.clearCookie('user')
    return res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
}

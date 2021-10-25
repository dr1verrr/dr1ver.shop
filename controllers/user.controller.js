const pool = require('../db').pool

exports.user = async (req, res) => {
  try {
    const sessionId = req.cookies.user
    const userData = await pool.query(
      'SELECT firstname, lastname from users WHERE session_id = $1',
      [sessionId],
      (err, result) => {
        if (err) console.error(err)
        if (result) res.json(userData)
      }
    )
  } catch (err) {
    console.error(err.message)
  }
}

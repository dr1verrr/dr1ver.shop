const pool = require('../db').pool

exports.user = async (req, res) => {
  try {
    const user = req.cookies.user
    const parsed = user && JSON.parse(user)

    await pool.query(
      'SELECT firstname, lastname FROM users WHERE session_id = $1;',
      [parsed.sessionId],
      (err, result) => {
        if (err) console.error(err)
        if (result) res.json(result.rows[0])
      }
    )
  } catch (err) {
    console.error(err.message)
  }
}

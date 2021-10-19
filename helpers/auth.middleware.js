const jwt = require('jsonwebtoken')

exports.loggedIn = async (req, res, next) => {
  const token = req.cookies.token || ''

  console.log(token)
  try {
    if (!token) return res.status(401).send('Access Denied')
    const decrypt = await jwt.verify(token, process.env.TOKEN_SECRET)

    if (decrypt.user_type_id === 2) {
      // Check authorization, 2 = Customer, 1 = Admin
      let req_url = req.baseUrl + req.route.path
      if (req_url.includes('users/:id') && parseInt(req.params.id) !== decrypt.id) {
        return res.status(401).send('Unauthorized!')
      }
    }
    req.user = decrypt
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

exports.adminOnly = async function (req, res, next) {
  if (req.user.user_type_id === 2) {
    return res.status(401).send('Access Denied')
  }
  next()
}

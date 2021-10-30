exports.userMiddleware = async (req, res, next) => {
  const cookies = req.cookies
  const user = cookies.user && JSON.parse(cookies.user)

  if (user && user.userTypeId === 1) {
    req.user = user
    next()
  }
}

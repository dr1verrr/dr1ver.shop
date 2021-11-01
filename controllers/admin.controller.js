exports.adminLogin = async (req, res) => {
  const { password } = req.body
  const user = req.cookies.user
  const parsedUser = user && JSON.parse(user)

  try {
    if (password === process.env.ADMIN_PASSWORD) {
      const { id, email, sessionId } = parsedUser

      if (parsedUser.userTypeId === 1) {
        res.send('You are already authorized as admin')
      } else {
        await res.cookie(
          'user',
          JSON.stringify({
            id,
            email,
            sessionId,
            userTypeId: 1,
          }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 60 * 24 * 21600),
          }
        )
        await res.send({ parsedUser, userTypeId: 1 })
      }
    } else {
      res.status(401).send('Wrong password')
    }
  } catch (err) {
    console.error(err, 'Something went wrong._.')
  }
}

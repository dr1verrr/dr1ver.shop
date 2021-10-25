export default function handler(req, res) {
  try {
    const user = req.cookies.user
    if (user) {
      res.status(200).json({ user: user })
    } else {
      res.json({ user: null })
    }
  } catch (err) {
    console.err(err)
  }
}

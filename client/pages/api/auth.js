export default function handler(req, res) {
  try {
    const user = req.cookies.user
    if (user) JSON.parse(user)

    res.json({ user: user || null })
  } catch (err) {
    console.error(err)
  }
}

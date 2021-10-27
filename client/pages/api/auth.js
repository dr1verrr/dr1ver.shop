export default function handler(req, res) {
  try {
    const cookies = req.cookies
    const user = cookies.user && JSON.parse(cookies.user)

    res.json({ user: user || null })
  } catch (err) {
    console.error(err)
  }
}

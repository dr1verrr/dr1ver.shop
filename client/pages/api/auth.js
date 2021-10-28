export default function handler(req, res) {
  try {
    const cookies = req.cookies
    const user = cookies.user && JSON.parse(cookies.user)

    return res.json({ status: user ? 'SIGNED_IN' : 'SIGNED_OUT', user: user || null })
  } catch (err) {
    console.error(err)
  }
}

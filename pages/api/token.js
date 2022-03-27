export default async function handler(req, res) {
  try {
    const token = req.cookies.jwt

    res.status(200).json(token)
  } catch (e) {
    res.status(400).send(e.response.data?.message[0]?.messages[0])
  }
}

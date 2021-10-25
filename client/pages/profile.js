import Dashboard from '../components/Dashboard'

export function getServerSideProps(ctx) {
  const user = JSON.parse(ctx.req.cookies.user)

  return {
    props: { user: user }, // will be passed to the page component as props
  }
}

export default function Profile(req, res) {
  return <Dashboard userData={req.user} />
}

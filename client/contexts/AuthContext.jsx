const AuthContext = ({ authenticated, user }) => {
  if (!authenticated) {
    return (
      <div>
        <span>You are not authenticated :(</span>
      </div>
    )
  }
  return (
    <div>
      <span>You are authenticated as: {user} :)</span>
    </div>
  )
}

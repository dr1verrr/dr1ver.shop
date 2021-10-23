exports.sessionizeUser = user => {
  const { firstname, lastname, id, email } = user
  return { id, firstname, lastname, email }
}

import axios from 'axios'

export const saveChanges = async (data, cb, isAuthenticated) => {
  if (isAuthenticated) {
    const response = await axios.put('/api/user/cart/update', data.cartData)

    if (response.status == 201) return cb()
  }

  return cb()
}

import axios from 'axios'

export default function useRequest() {
  return async function (url, config) {
    try {
      return await axios({ url, ...config })
    } catch (err) {
      console.error(err)
    }
  }
}

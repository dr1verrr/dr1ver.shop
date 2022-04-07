import axios from 'axios'

export default function useRequest() {
  return async function (url, config) {
    return await axios({ url, ...config })
  }
}

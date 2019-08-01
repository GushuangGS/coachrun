import axios from 'axios'
import { baseURL } from '../../config'

export function resetPassword(uid, data, headers) {
  const url = `${baseURL}/user-api/users/${uid}/change-password`
  data.uid = uid

  return axios.post(url, data, { headers })
}

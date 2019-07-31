import axios from 'axios'
import { baseURL, commonParams } from '../../config'

export function resetPassword(uid, formData, headers) {
  const url = `${baseURL}/user-api/users/:userId/change-password`
  const data = Object.assign({}, commonParams, formData)

  return axios.post(url, data, { headers })
}

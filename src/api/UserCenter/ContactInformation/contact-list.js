import axios from 'axios'
import { baseURL } from '../../config'

export function getContactList(userid, headers) {
  const url = `${baseURL}/user-api/users/${userid}/contact-infos/`

  return axios.get(url, {
    params: { userId: userid },
    headers
  })
}

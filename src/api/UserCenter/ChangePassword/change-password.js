import axios from 'axios'
import {commonParams, options} from "@/api/config"

export function savePassword(uid, formData) {
  const url = ''
  const data = Object.assign({}, commonParams, {
    topid,
    page: 'detail'
  })

  return axios.post(url, data)
}

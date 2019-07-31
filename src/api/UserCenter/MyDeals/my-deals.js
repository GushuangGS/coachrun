import axios from 'axios'
import {baseURL} from "@/api/config"

export function dealsInfo() {
  const url = baseURL + '/promotion-api/promotions'
  const data = Object.assign({
    website:'1',
    deviceType:'1',
    userId:'1571335'
  })

  return axios.get(url, data)
}

import apiUrl from '../apiConfig'
import axios from 'axios'

export const getUser = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/users',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

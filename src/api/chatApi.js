import apiUrl from '../apiConfig'
import axios from 'axios'

export const sendChat = (chat, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/chatmsg',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      chat: {
        content: chat.content
      }
    }
  })
}

import apiUrl from '../apiConfig'
import axios from 'axios'

// Request to Create a chat message
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

// request to find all chat messages
export const getChats = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/chatmsg',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// Delete a chat message
export const delChat = (user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/chatmsg',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// Edit a chat message
export const editChat = (user, chat) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/chatmsg',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      chat: {
        content: chat
      }
    }
  })
}

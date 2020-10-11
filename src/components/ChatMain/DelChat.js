import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { delChat } from '../../api/chatApi.js'

import io from 'socket.io-client'
import apiUrl from '../../apiConfig'
const socket = io.connect(apiUrl)

class DelChat extends Component {
  componentDidMount () {
    const { msgAlert, history, user, match } = this.props
    const { msgId } = match.params
    delChat(user, match.params.msgId)
      .then(() => msgAlert({
        heading: 'Success',
        message: 'Your Chat Message has been Deleted Successfully',
        variant: 'success'
      }))
      .then(() => socket.emit('del', { msgId }))
      .catch(() => msgAlert({
        heading: 'Fail',
        message: 'You can only Delete Your Chats',
        variant: 'danger'
      }))
      .finally(() => history.push('/farmChat'))
  }

  render () {
    return ''
  }
}

export default withRouter(DelChat)

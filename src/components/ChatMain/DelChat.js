import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { delChat } from '../../api/chatApi.js'

class DelChat extends Component {
  componentDidMount () {
    const { msgAlert, history, user, match } = this.props
    delChat(user, match.params.msgId)
      .then(() => msgAlert({
        heading: 'Success',
        message: 'Your Chat Message has been Deleted Successfully',
        variant: 'success'
      }))
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

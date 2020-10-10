import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import apiUrl from '../../apiConfig'
import io from 'socket.io-client'
const socket = io.connect(apiUrl)

class SignOut extends Component {
  componentDidMount () {
    const { msgAlert, history, clearUser, user } = this.props

    signOut(user)
      .finally(() => msgAlert({
        heading: 'Signed Out Successfully',
        messagE: messages.signOutSuccess,
        variant: 'success'
      }))
      .finally(() => history.push('/'))
      .finally(() => socket.emit('end'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)

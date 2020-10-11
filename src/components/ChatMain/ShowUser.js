import React, { Component, Fragment } from 'react'

import { getUser } from '../../api/getUser.js'
import './showuser.css'

import io from 'socket.io-client'
import apiUrl from '../../apiConfig'
const socket = io.connect(apiUrl)

class ShowUser extends Component {
  constructor () {
    super()
    this.state = {
      name: []
    }
  }

  getUserFunc = () => {
    return (getUser(this.props.user)
      .then(res => {
        if (res.data.length > 0) {
          this.setState((prevState) => {
            const add = [...res.data]
            return { name: add }
          })
        }
      })
      .catch(console.error)
    )
  }

  componentDidMount () {
    this.getUserFunc()
    socket.on('user', (data) => {
      this.getUserFunc()
    })
  }

  render () {
    let showJSX
    if (this.state.name.length === 0) {
      showJSX = ''
    } else {
      showJSX = (
        <ul className = 'userList'>
          {this.state.name.filter(val => val.signIn === true).map(({ email }, index) => {
            return (
              <li key={index} className='online'> {email}</li>
            )
          })}
          {this.state.name.filter(val => val.signIn === false).map(({ email }, index) => {
            const user = email.split('@')
            return (
              <li key={index + this.state.name.length} className='offline'>{user[0]}</li>
            )
          })}
        </ul>
      )
    }
    return (
      <Fragment>
        {showJSX}
      </Fragment>
    )
  }
}

export default ShowUser

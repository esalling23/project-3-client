import React, { Component } from 'react'
import io from 'socket.io-client'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

// import ChatOptions from './ChatOptions.js'
import { sendChat, getChats } from '../../api/chatApi.js'
import './chatmain.css'

const socket = io.connect(apiUrl)

class Chatmain extends Component {
  constructor () {
    super()
    this.state = {
      content: '',
      chats: []
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  showChats = () => {
    console.log(this.state.chats, 'checking')
    return this.state.chats.map(({ content, email, _id, ownerId }) => {
      const user = email.split('@')
      return (
        <div key={_id} data-msgid={ownerId} data-id={_id} onClick = {this.onChatClick}>
          <h3 data-msgid={ownerId} data-id={_id}>{user[0]}:</h3>
          <span data-msgid={ownerId} data-id={_id}>{content}</span>
        </div>
      )
    })
  }

  onChatClick = e => {
    console.log(e.target)
  }

  onSend = e => {
    e.preventDefault()
    const user = this.props.user
    const { email } = this.props.user
    const { content } = this.state
    sendChat(this.state, user)
      .then(res => {
        socket.emit('chat', { content, email })
        this.setState({ content: '' })
      })
      .catch(this.setState({ content: '' }))
  }

  componentDidMount () {
    getChats(this.props.user)
      .then(res => {
        if (res.data.length > 0) {
          this.setState((prevState) => {
            const show = [...prevState.chats, ...res.data]
            return { chats: show }
          })
        }
      })
    socket.on('chat', (data) => {
      this.setState((prevState) => {
        return { chats: [...prevState.chats, data] }
      })
    })
  }

  render () {
    let showDiv
    if (this.state.chats.length !== 0) {
      showDiv = this.showChats()
    } else {
      showDiv = ''
    }
    return (
      <div className="row">
        <div className="showArea">{showDiv}</div>
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Form onSubmit={this.onSend}>
            <Form.Group controlId="msg">
              <Form.Control
                required
                name="content"
                value={this.state.content}
                type="text"
                placeholder="Type here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Chatmain

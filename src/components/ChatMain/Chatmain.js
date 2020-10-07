import React, { Component } from 'react'
import io from 'socket.io-client'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

import { sendChat } from '../../api/chatApi.js'
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
    return this.state.chats.map(({ content, owner }, index) => (
      <div key={index}>
        <h3>{owner.email}:</h3>
        <span>{content}</span>
      </div>
    ))
  }

  onSend = e => {
    e.preventDefault()
    const owner = this.props.user
    const { content } = this.state
    sendChat(this.state, owner)
      .then(res => {
        socket.emit('chat', { content, owner })
        this.setState({ content: '' })
      })
      .catch(this.setState({ content: '' }))
  }

  // componentDidmount () {
  //   socket.on('chat', (data) => {
  //     console.log(data)
  //   })
  // }
  componentDidMount () {
    socket.on('chat', (data) => {
      console.log(data)
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

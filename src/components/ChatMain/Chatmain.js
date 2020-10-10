import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ShowUser from './ShowUser.js'

import { animateScroll } from 'react-scroll'

import apiUrl from '../../apiConfig'

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

  onSend = e => {
    e.preventDefault()
    const user = this.props.user
    const { email, _id } = this.props.user
    const ownerId = _id
    const { content } = this.state
    sendChat(this.state, user)
      .then(res => {
        const { _id } = res.data.data
        socket.emit('chat', { content, email, ownerId, _id })
        this.setState({ content: '' })
      })
      .catch(this.setState({ content: '' }))
  }

  componentDidMount () {
    getChats(this.props.user)
      .then(res => {
        if (res.data.length > 0) {
          this.setState((prevState) => {
            return { chats: [...prevState.chats, ...res.data] }
          })
        }
      })
    socket.on('chat', (data) => {
      this.setState((prevState) => {
        return { chats: [...prevState.chats, data] }
      })
    })
    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    animateScroll.scrollToBottom({
      containerId: 'chatBox'
    })
  }

  componentWillUnmount () {
    this.setState({ content: '', chats: [] })
  }

  render () {
    let showDiv
    if (this.state.chats.length !== 0) {
      showDiv = (
        this.state.chats.map(({ content, email, _id, ownerId }, index) => {
          const user = email.split('@')
          return (
            <div key={index} className={this.props.user._id === ownerId ? 'mymsg' : 'yourmsg' }>
              <div className='chatHead'>
                <h3>{user[0]}:</h3>
                <div>
                  <Link to={`/editChat/${_id}`}>
                    <Button>I</Button>
                  </Link>
                  <Link to={`/delChat/${_id}`}>
                    <Button>X</Button>
                  </Link>
                </div>
              </div>
              <span>{content}</span>
            </div>
          )
        })
      )
    } else {
      showDiv = ''
    }
    return (
      <Fragment>
        <div className='row'>
          <div className="col-sm-8 col-md-10 mx-auto mt-4">
            <div className="row">
              <div className="showArea" id="chatBox">{showDiv}</div>
              <div className="col-sm-10 col-md-10 mx-auto mt-4">
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
                  <Button variant="success" type="submit">Send</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className='users'>Hi, Strangers</div>
        <div className='showUsers'> <ShowUser user={this.props.user}/> </div>
      </Fragment>
    )
  }
}

export default Chatmain

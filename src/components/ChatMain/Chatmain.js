import React, { Component, Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import io from 'socket.io-client'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ShowUser from './ShowUser.js'

import apiUrl from '../../apiConfig'
import EditChat from './EditChat.js'

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
    console.log(this.state.chats, 'yo')
    return this.state.chats.map(({ content, email, _id, ownerId }, index) => {
      const user = email.split('@')
      console.log(ownerId, this.props.user._id, 'hi')
      return (
        <div key={index} className={this.props.user._id === ownerId ? 'mymsg' : 'yourmsg' }>
          <div className='chatHead'>
            <h3>{user[0]}:</h3>
            <div>
              <Link to={`/editChat/${ownerId}/${index}`}>
                <Button>I</Button>
              </Link>
              <Link to={`/delChat/${ownerId}/${_id}`}>
                <Button>X</Button>
              </Link>
            </div>
          </div>
          <span>{content}</span>
        </div>
      )
    })
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
      .finally(this.componentDidMount())
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
      <Fragment>
        <div className='row'>
          <div className="col-sm-8 col-md-8 mx-auto mt-5">
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
                  <Button variant="success" type="submit">Submit</Button>
                </Form>
              </div>
            </div>
          </div>
          <div className='col mt-5'>
            <div className='showUsers'> <ShowUser user={this.props.user}/> </div>
          </div>
        </div>
        <div>
          <Route path='/editChat/:ownerId/:msg' render={({ match }) => (
            <EditChat msgAlert={this.props.msgAlert} user={this.props.user} match={match} chats={this.state.chats} />
          )} />
        </div>
      </Fragment>
    )
  }
}

export default Chatmain

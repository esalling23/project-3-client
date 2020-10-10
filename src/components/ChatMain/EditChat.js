import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { editChat, getChats } from '../../api/chatApi.js'

import io from 'socket.io-client'
import apiUrl from '../../apiConfig'
const socket = io.connect(apiUrl)

class EditChat extends Component {
  constructor () {
    super()
    this.state = {
      content: ''
    }
  }
  onSend = e => {
    e.preventDefault()
    const { user, msgAlert, match } = this.props
    const { content } = this.state
    const email = this.props.user.email
    const ownerId = this.props.user._id
    const { msgId } = match.params
    const _id = msgId
    editChat(user, content, msgId)
      .then(() => msgAlert({
        heading: 'Success',
        message: 'Your Chat Message has been Updated Successfully',
        variant: 'success'
      }))
      .then(() => socket.emit('edit', { content, email, ownerId, _id }))
      .catch(() => msgAlert({
        heading: 'Fail',
        message: 'You can only Update Your Chats',
        variant: 'danger'
      }))
      .finally(this.setState({ content: '' }))
      .finally(() => this.props.history.push('/farmChat'))
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  componentDidMount () {
    const { params } = this.props.match
    getChats(this.props.user)
      .then(res => {
        const chatObj = res.data.filter(val => val._id === params.msgId)
        if (this.props.user._id === chatObj[0].ownerId) {
          const chatCont = chatObj[0].content
          let copyCont = Object.assign('', this.state.content)
          copyCont = chatCont
          this.setState({ content: copyCont })
        } else {
          this.props.msgAlert({
            heading: 'Fail',
            message: 'You can only Update Your Chats',
            variant: 'danger'
          })
          this.props.history.push('/farmChat')
        }
      })
      .catch(console.error)
  }

  componentWillUnmount () {
    return this.setState({ content: '' })
  }

  render () {
    return (
      <div className="row">
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
    )
  }
}

export default withRouter(EditChat)

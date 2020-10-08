import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { editChat } from '../../api/chatApi.js'

class EditChat extends Component {
  constructor () {
    super()
    this.state = {
      content: ''
    }
  }
  onSend = e => {
    e.preventDefault()
    editChat()
      .then()
      .catch()
      .finally()
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  componentDidMount () {
    console.log(this.props)
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

export default EditChat

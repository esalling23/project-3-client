import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './chatmain.css'

class Chatmain extends Component {
  constructor () {
    super()
    this.state = {
      msg: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  render () {
    return (
      <div className="row">
        <div className="showArea"></div>
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="msg">
              <Form.Control
                required
                name="msg"
                value={this.state.msg}
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

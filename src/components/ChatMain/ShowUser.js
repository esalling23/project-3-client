import { Component } from 'react'

import { getUser } from '../../api/getUser.js'

class ShowUser extends Component {
  constructor () {
    super()
    this.state = {
      name: []
    }
  }

  componentDidMount () {
    getUser(this.props.user)
      .then(res => {
        console.log(res.data)
        this.setState(() => {
          return { name: res.data }
        })
      })
      .catch(console.error)
    console.log(this.state.name)
  }
  render () {
    return ''
  }
}

export default ShowUser

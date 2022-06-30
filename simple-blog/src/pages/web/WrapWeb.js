import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'

class WrapWeb extends Component {
  render() {
    return (
      <div>
        <Outlet />
      </div>
    )
  }
}

export default WrapWeb
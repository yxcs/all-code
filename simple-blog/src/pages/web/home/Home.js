import React, { Component } from 'react'
import './home.scss'

class Home extends Component {
  render() {
    return (
      <div className="web--home__wrap">
        <div className="web--home__left-content">
          <div className="web--home__description">text</div>
          <div className="web--home__copyright">copy</div>
        </div>
        <div className="web--home__right-content"></div>
      </div>
    )
  }
}

export default Home
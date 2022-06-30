import React from 'react';
import './layout.scss';

class HomeHeader extends React.Component {
  render() {
    return (
      <div
        className="home__header--wrap"
        style={{backgroundImage: 'url("https://yxcs.gitee.io/images/banner/banner.jpg")'}}>
        <div className="header--blur">
          <div className="avatar">
            <img src="https://yxcs.gitee.io/img/avatar.jpg" alt="" />
          </div>
          <div className="slogan">
            <img src="https://yxcs.gitee.io/img/branding.png" alt="" />
          </div>
        </div>
      </div>
    )
  }
}

export default HomeHeader;

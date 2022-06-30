import React from 'react';
import './layout.scss';

class HomeNavbar extends React.Component {
  render() {
    return (
      <div className="home__navbar--wrap">
        <div className="navbar--menu">
          <div className="menu">
            <div>首页</div>
            <div>前端</div>
            <div>后端</div>
            <div>工具</div>
            <div>杂文</div>
          </div>
          <div className="search"></div>
        </div>
      </div>
    )
  }
}

export default HomeNavbar;

import React, { Component } from 'react';
import { Layout } from 'antd';
import MenuContainer from './containers/MainMenu.js';
import './style/app.css';
import logo from './assets/logo.png';
const { Sider } = Layout;

class App extends Component {
  constructor (props) {
    super(props);
    // 兼容旧的投放页面，更改history路由规则，以便百度统计
    // 能够准确区分每个页面
    let hash = location.hash;
    if (/^#\/h5\/\d$/.test(hash)) {
      this.state = {
        collapsed: true,
        match: true
      };
      location.href = `${hash.substring(1, hash.length)}`;
    } else {
      this.state = {
        collapsed: true,
        match: false
      };
    }
  }
  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    if (!this.state.match) {
      return (
        <div className='App' style={{height: '100%'}}>
          <Layout style={{height: '100%'}}>
            <Sider
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              collapsible>
              <div className='logo'><img alt='logo' src={logo} /></div>
              <MenuContainer />
            </Sider>
            <Layout>
              {this.props.children}
            </Layout>
          </Layout>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default App;

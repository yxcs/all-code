import React from 'react';
import './layout.scss';

class HomeFooter extends React.Component {
  _footer = null
  state = {
    isFixed: false
  }

  componentDidMount() {
    this.setState({
      isFixed: !this.hasScrollbar()
    })
  }
  hasScrollbar() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
  }
  render() {
    const { isFixed } = this.state;
    return (
      <div ref={ref => this._footer = ref} className={['home__footer--wrap', isFixed ? 'fixed' : ''].join(' ')}>
        <span>Copyright © 2017 | Powered by Hexo | Theme by Snippet</span>
      </div>
    )
  }
}

export default HomeFooter;

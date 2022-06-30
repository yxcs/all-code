import React from 'react';
import './side.scss';

import BarBox from './BarBox'

class LinkBar extends React.Component {
  render() {
    return (
      <BarBox title="友情链接">
        <div className="link--warp">
          <p>Hexo官网</p>
          <p>友情链接</p>
        </div>
      </BarBox>
    )
  }
}

export default LinkBar;

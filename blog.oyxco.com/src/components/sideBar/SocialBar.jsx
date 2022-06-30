import React from 'react';
import './side.scss';

import BarBox from './BarBox'

class SocialBar extends React.Component {
  render() {
    return (
      <BarBox title="社交">
        <div className="social--warp">
          <div className="icon">git</div>
          <div className="icon">微信</div>
          <div className="icon">QQ</div>
          <div className="icon">新浪</div>
        </div>
      </BarBox>
    )
  }
}

export default SocialBar;

import React from 'react';
import './side.scss';

import BarBox from './BarBox'

class TagBar extends React.Component {
  render() {
    return (
      <BarBox title="标签云">
        <div className="tar--warp">
          <div>vue</div>
          <div>后端开发</div>
          <div>React</div>
          <div>nodejs</div>
          <div>typescript</div>
          <div>vue</div>
        </div>
      </BarBox>
    )
  }
}

export default TagBar;

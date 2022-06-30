import React from 'react';
import './side.scss';

import BarBox from './BarBox'

class TimeSortBar extends React.Component {
  render() {
    return (
      <BarBox title="归档">
        <div className="time-sort--warp">
          <p><span className="label">2020年12月</span><span className="value">（20）</span></p>
          <p><span className="label">2020年12月</span><span className="value">（20）</span></p>
          <p><span className="label">2020年12月</span><span className="value">（20）</span></p>
          <p><span className="label">2020年12月</span><span className="value">（20）</span></p>
        </div>
      </BarBox>
    )
  }
}

export default TimeSortBar;

import React from 'react';
import './side.scss';

import BarBox from './BarBox'

class SearchBar extends React.Component {
  render() {
    return (
      <BarBox title="搜索">
        <div className="search--warp">
          <input placeholder="搜索点什么那？" className="ipt" />
          <div className="btn"> 搜  索 </div>
        </div>
      </BarBox>
    )
  }
}

export default SearchBar;

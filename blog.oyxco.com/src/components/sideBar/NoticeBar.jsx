import React from 'react';
import './side.scss';

import BarBox from './BarBox'

class SearchBar extends React.Component {
  render() {
    return (
      <BarBox title="网站公告">
        <div className="notice--warp">
          <p><span className="label">主题下载：</span><span className="value">Snippet主题</span></p>
          <p><span className="label">主题使用：</span><span className="value">常见使用问题</span></p>
          <p><span className="label">支持主题：</span><span className="value">Star一下</span></p>
        </div>
      </BarBox>
    )
  }
}

export default SearchBar;

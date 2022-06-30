import React from 'react';
import './side.scss';

import BarBox from './BarBox'

class CategoryBar extends React.Component {
  render() {
    return (
      <BarBox title="分类">
        <div className="category--warp">
          <p><span className="value">Snippet主题</span><span className="label">(20)</span></p>
          <p><span className="value">Snippet主题</span><span className="label">(20)</span></p>
          <p><span className="value">Snippet主题</span><span className="label">(20)</span></p>
          <p><span className="value">Snippet主题</span><span className="label">(20)</span></p>
        </div>
      </BarBox>
    )
  }
}

export default CategoryBar;

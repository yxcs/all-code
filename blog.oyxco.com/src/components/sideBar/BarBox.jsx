import React from 'react';
import './side.scss';

class BarBox extends React.Component {
  render() {
    return (
      <div className="bar__box--wrap">
        <div className="title">
          <div className="txt">{ this.props.title }</div>
        </div>
        { this.props.children }
      </div>
    )
  }
}

export default BarBox;

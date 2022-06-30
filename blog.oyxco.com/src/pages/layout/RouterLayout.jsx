import React from 'react';
import MobileRouter from '../mobile/router';
import PcRouter from '../pc/router';
import AdminRouter from '../admin/router'

class RouterLayout extends React.Component {
  render() {
    return (
      <div>
        <MobileRouter />
        <PcRouter />
        <AdminRouter />
      </div>
    )
  }
}

export default RouterLayout;

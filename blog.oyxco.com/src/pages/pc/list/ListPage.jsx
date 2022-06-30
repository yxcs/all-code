import React from 'react';

import HomeHeader from '../../../components/layout/HomeHeader';
import HomeNavbar from '../../../components/layout/HomeNavbar';
import ListContent from '../../../components/layout/ListContent';
import HomeFooter from '../../../components/layout/HomeFooter';

class ListPage extends React.Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <HomeNavbar />
        <ListContent />
        <HomeFooter />
      </div>
    )
  }
}

export default ListPage;

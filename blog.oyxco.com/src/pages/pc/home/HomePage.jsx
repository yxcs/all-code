import React from 'react';

import HomeHeader from '../../../components/layout/HomeHeader';
import HomeNavbar from '../../../components/layout/HomeNavbar';
import HomeContent from '../../../components/layout/HomeContent';
import HomeFooter from '../../../components/layout/HomeFooter';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <HomeNavbar />
        <HomeContent />
        <HomeFooter />
      </div>
    )
  }
}

export default HomePage;

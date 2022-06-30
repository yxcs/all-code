import React from 'react';

import HomeHeader from '../../../components/layout/HomeHeader';
import HomeNavbar from '../../../components/layout/HomeNavbar';
import ArticleContent from '../../../components/layout/ArticleContent';
import HomeFooter from '../../../components/layout/HomeFooter';

class ArticlePage extends React.Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <HomeNavbar />
        <ArticleContent />
        <HomeFooter />
      </div>
    )
  }
}

export default ArticlePage;

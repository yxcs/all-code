import React from 'react';
import './layout.scss';

import ArticleBox from '../content/ArticleBox';
import SimplePage from '../pagination/SimplePage';
import Catalogue from '../sideBar/Catalogue';

class ArticleContent extends React.Component {
  render() {
    return (
      <div className="home__content--wrap">
        <div className="content--list">
          <ArticleBox />
          <SimplePage />
        </div>
        <div className="side-nav">
          <Catalogue />
        </div>
      </div>
    )
  }
}

export default ArticleContent;

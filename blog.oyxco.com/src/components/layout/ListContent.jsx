import React from 'react';
import './layout.scss';

import ContentCategoryList from '../content/ContentCategoryList';
import SearchBar from '../sideBar/SearchBar';
import NoticeBar from '../sideBar/NoticeBar';
import SocialBar from  '../sideBar/SocialBar';
import CategoryBar from  '../sideBar/CategoryBar';
import TimeSortBar from '../sideBar/TimeSortBar';
import TagBar from '../sideBar/TagBar';
import LinkBar from '../sideBar/LinkBar';

class ListContent extends React.Component {
  render() {
    return (
      <div className="home__content--wrap">
        <div className="content--list">
          <ContentCategoryList />
        </div>
        <div className="side-nav">
          <SearchBar />
          <NoticeBar />
          <SocialBar />
          <CategoryBar />
          <TimeSortBar />
          <TagBar />
          <LinkBar />
        </div>
      </div>
    )
  }
}

export default ListContent;

import React from 'react';
import './layout.scss';

import ContentHomeList from '../content/HomeList';
import SearchBar from '../sideBar/SearchBar';
import NoticeBar from '../sideBar/NoticeBar';
import SocialBar from  '../sideBar/SocialBar';
import CategoryBar from  '../sideBar/CategoryBar';
import TimeSortBar from '../sideBar/TimeSortBar';
import TagBar from '../sideBar/TagBar';
import LinkBar from '../sideBar/LinkBar';

class HomeContent extends React.Component {
  render() {
    return (
      <div className="home__content--wrap">
        <div className="content--list">
          <ContentHomeList />
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

export default HomeContent;

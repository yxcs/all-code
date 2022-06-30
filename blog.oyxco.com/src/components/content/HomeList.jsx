import React from 'react';
import './content.scss';
import HomeItem from './HomeItem';
import ContentHeader from './ContentHeader';
import Pagination from '../pagination/Pagination';

class ContentHomeList extends React.Component {

  getCurrentPage(currentPage) {
    console.log('currentPage', currentPage)
  }

  render() {
    return (
      <div className="content--home__list">
        <ContentHeader />
        {
          [1,2,3,4,5,6,7,8,9,10].map(item => <HomeItem key={item} />)
        }
        <div className="page--wrap">
          <div className="page">
            <Pagination pageCallbackFn={this.getCurrentPage.bind(this)} totalPage={20} currentPage={5}></Pagination>
          </div>
        </div>
      </div>
    )
  }
}

export default ContentHomeList;

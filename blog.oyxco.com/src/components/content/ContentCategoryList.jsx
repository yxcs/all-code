import React from 'react';
import './content.scss';
import CategoryItem from './CategoryItem';
import CategoryHeader from './CategoryHeader';
import Pagination from '../pagination/Pagination';

class ContentCategoryList extends React.Component {

  getCurrentPage(currentPage) {
    console.log('currentPage', currentPage)
  }

  render() {
    return (
      <div className="content--home__list">
        <CategoryHeader />
        {
          [1,2,3,4,5,6,7,8,9,10].map(item => <CategoryItem key={item} />)
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

export default ContentCategoryList;

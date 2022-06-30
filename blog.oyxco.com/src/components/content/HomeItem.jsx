import React from 'react';
import './content.scss';

class ContentHomeItem extends React.Component {
  render() {
    return (
      <div className="content--home__item">
        <div className="item--wrap">
          <div className="item-content">
            <div className="con-img">
              <img src="https://i.loli.net/2020/04/08/KoGcFLAP91XsanN.png" alt="" />
            </div>
            <div className="con-desc">
              <div className="title">搭建vue脚手架-12vue项目优化</div>
              <div className="time">• 2020年12月20日</div>
              <div className="con">vue项目优化前言 公司现在的后台项目大都是使用的vue作为前端开发框架，一些新的系统搭建也会使用vue，同时原有的老项目改造也会改为前后端分离的模式，前端选型也是使用的vue。每个项目随着功能和版本的迭代，项目会越来越大，那么项...</div>
            </div>
          </div>
          <div className="item-extra">
            <div className="tags">
              <span>前端</span>
              <span>vue</span>
            </div>
            <div className="more">
              <div className="btn">阅读全文</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContentHomeItem;

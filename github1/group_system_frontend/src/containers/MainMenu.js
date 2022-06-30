import MenuComponent from '../components/MenuComponent.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    menuList: [
      {id: '001', text: '群管理', path: '/group_manage'},
      {id: '002', text: '活动页面', path: '/activity_page'},
      {id: '0021', text: '添加活动', path: '/activity_page/add'},
      {id: '0022', text: '编辑活动', path: '/activity_page/edit/:id'},
      {id: '003', text: 'H5页面', path: '/h5/:id'}
    ]
  };
};

let MenuContainer = connect(
  mapStateToProps
)(MenuComponent);

export default MenuContainer;


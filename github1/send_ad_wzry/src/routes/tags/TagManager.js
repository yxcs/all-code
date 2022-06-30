/**
 * Created by Administrator on 2017/3/10.
 */
import React,{Component} from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import AddTags from '../../components/addTags';
import { getTagList, deleteTag } from '../../services/interface';
import {Modal, Row, Col, Button, Icon, Radio, Table, Popconfirm, message} from 'antd';
const ButtonGroup = Button.Group;

class TagManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      addModalVisible: false,
      pagination: false,
      dataSource: [],
      loading: true,
      columns: [{
        title: '#',
        dataIndex: 'id',
        key: 'id'
      },{
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value) => {
          let date = new Date(value);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
      }, {
        title: '删除',
        dataIndex: 'id',
        key: 'deleteId',
        render: (id, record) => {
          return (
              <Popconfirm placement="top" onConfirm={this.onDeleteTag.bind(this,id)} title="确认删除？" okText="确认" cancelText="取消">
                <Button size="small" type="danger"><Icon type="delete" /></Button>
              </Popconfirm>
          )
        }
      }]
    }
  }

  componentWillMount () {
    this.setState({
        loading: true
    })
    getTagList().then(data => {
        this.setState({
            dataSource: data.data.data,
            loading: false
        })
    });
  }

  handleHideAdd = () =>{
    this.setState({
      addModalVisible: !this.state.addModalVisible
    });
  };

  handleDisplayAdd = () => {
    this.setState({
      addModalVisible: true
    });
  };

  gotoLink = (v) => {
    location.hash = v;
  };

  onDeleteTag = (id) => {
    id = +id;
    deleteTag(id).then(data => {
      message.success("删除成功")
      setTimeout(_ => {
          location.reload(true);
        }, 800);
    })
  }

  render(){
    return (
      <div>
        <Row style={{marginTop: '24px', marginBottom: '10px'}}>
          <Col span={8}>
            <ButtonGroup>
              <Button onClick={this.gotoLink.bind(this,'#account')}>微信账号</Button>
              <Button onClick={this.gotoLink.bind(this,'#groups')}>微信群</Button>
              <Button type="primary">标签管理</Button>
              <Button onClick={this.gotoLink.bind(this,'#videos')}>视频管理</Button>
            </ButtonGroup>
          </Col>
          <Col span='2'>
            <AddTags
              handleDisplayAdd={this.handleDisplayAdd}
              handleHideAdd={this.handleHideAdd}
              addModalVisible={this.state.addModalVisible}/>
          </Col>
        </Row>
        <Row>
          <Col span='24' style={{marginTop: '10px'}}>
            <Table
              pagination={this.state.pagination}
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              loading={this.state.loading}
              rowKey="id"
              bordered/>
          </Col>
        </Row>
      </div>
    );
  }
}

TagManager.propTypes = {
};

export default connect()(TagManager);

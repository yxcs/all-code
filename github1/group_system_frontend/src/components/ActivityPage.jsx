import React from 'react';
import { Link } from 'react-router';
import { Layout,Card,Row,Col,Button,Icon,Table,message } from 'antd';
import copyToClipboard from 'copy-to-clipboard';
const { Content } = Layout;
import ShowCode from './ShowCode';
import * as config from '../config';

import {getAllActivity} from '../interface';

 class ActivityPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        pagination: {},
        loading: false,
        dataSource: []
    }
  }

  componentWillMount() {
      let params = {
          size: 10,
          page: 1
      };
      this.setState({
          loading: true
      });
      getAllActivity(params).then(data => {
          let pagination = this.state.pagination;
          pagination.total = data.data.data.totalItem;
          this.setState({
              loading: false,
              dataSource: data.data.data.data,
              pagination
          });
      })
  }

  getColumns = () => {
      return [
          {
              title: '#',
              dataIndex: 'id',
              key: 'id',
              width: '50px'
          }, {
              title: '活动名称',
              dataIndex: 'activityName',
              key: 'activityName',
              width: '150px'
          }, {
              title: '活动简介',
              dataIndex: 'activityDesc',
              key: 'activityDesc'
          }, {
              title: '仅剩名额',
              dataIndex: 'lastPullNum',
              key: 'lastPullNum',
              width: '50px',
          }, {
              title: '参加活动的群',
              dataIndex: 'groupInfoList',
              key: 'groupInfoList',
              width: '150px',
              render:(value, record) => {
                  let lists = [];
                  value.forEach(v => {
                      lists.push(<ShowCode type='group' key={v.id} qrcode={v.qrcodeUrl} name={v.name}/>)
                  });
                  if(value.length > 0) {
                      return (
                          <ul>{lists}</ul>
                      )
                  }
                   return (
                       <p style={{textAlign:'center'}}>--</p>
                   )
              }
          }, {
              title: '创建时间',
              dataIndex: 'createdAt',
              key: 'createdAt',
              width: '165px',
              render: (value) => {
                  let date = new Date(value);
                  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
              }
          }, {
              title: '操作',
              dataIndex: 'id',
              key: 'edit_id',
              width: '140px',
              render:(value) => {
                  return (
                      <p>
                          <span style={{paddingRight:'10px'}}><Link to={'/activity_page/edit/' + value}>编辑</Link></span>
                          <span style={{paddingRight:'10px'}}><Button id="btn" size='small' onClick={this.onCopyToClipboard.bind(this, value)}>复制</Button></span>
                          <ShowCode type='activity' activityId={value}/>
                      </p>
                  );
              }
          }
      ]
  };

  handleTableChange = (pagination) => {
      const pager = this.state.pagination;
      pager.current = pagination.current;
      this.setState({
         pagination: pager,
         loading: true
      });
      let params = {
         page: pagination.current,
         size: 10
      };
      getAllActivity(params).then(data => {
             let pagination = this.state.pagination;
             pagination.total = data.data.data.totalItem;
             this.setState({
                 loading: false,
                 dataSource: data.data.data.data,
                 pagination
             });
         });
   };

   onCopyToClipboard = activityId => {
      //  h5接口
      let txt =`${config.formalUrl}:${config.formalPort}/h5/${activityId}`;
      copyToClipboard(txt);
      message.success('复制成功');
   }

  render () {
    return (
      <Layout>
        <Content className='content-main'>
            <Card>
                <Row>
                    <Col span={24}><Button><Link to={'activity_page/add'}><Icon type="plus" />添加</Link></Button></Col>
                    <Col span={24} style={{marginTop:"20px"}}>
                        <Table
                            pagination={this.state.pagination}
                            dataSource={this.state.dataSource}
                            columns={this.getColumns()}
                            onChange={this.handleTableChange}
                            loading={this.state.loading}
                            rowKey="id"
                            bordered/>
                    </Col>
                </Row>
            </Card>
        </Content>

      </Layout>
    );
  }
}

export default ActivityPage
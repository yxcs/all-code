/**
 * Created by Administrator on 2017/3/10.
 */
import React,{Component} from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import AddItemWx from '../../components/addItemWx.js';
import PlayVideo from '../../components/playVideo';
import BindTag from '../../components/BindTag';
import { getVideosAll, getTagList, getVideoByTag, bindTag2Video } from '../../services/interface';
import {Modal, Row, Col, Button, Icon, Radio, Table, Popconfirm, message} from 'antd';

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Videos extends Component{
  constructor(props){
    super(props);
    this.state = {
      tagId: 0,
      addModalVisible: false,
      pagination: {},
      dataSource: [],
      loading: true,
      tagList:[],
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },{
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },{
        title: '标签',
        dataIndex: 'wzryVideoTag',
        key: 'wzryVideoTag',
        render: (v, record) => {
          if(v&&v.tagName) {
             return <p style={{textAlign:"center"}}>{v.tagName}</p>
          }else {
             return <p style={{textAlign:"center"}}>--</p>
          }
        }
      }, {
        title: '播放次数',
        dataIndex: 'playCount',
        key: 'playCount'
      }, {
        title: '视频',
        dataIndex: 'picUrl',
        key: 'picUrl',
        width: 80,
        render: (v, record) => {
          return (
            <PlayVideo picUrl={v} mp4Url={record.mp4Url} />
          )
        }
      }, {
        title: '上传时间',
        dataIndex: 'uploadtime',
        key: 'uploadtime',
        render: (value) => {
          let date = new Date(value);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
      }, {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value) => {
          if (value) {
            let date = new Date(value);
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          } else {
            return '--';
          }
        }
      }, {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (value) => {
          if (value) {
            let date = new Date(value);
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          } else {
            return '--';
          }
        }
      }, {
        title: '操作',
        dataIndex: 'id',
        key: 'bindId',
        render: (id, record) => {
          if(record.wzryVideoTag&&record.wzryVideoTag.tagId&&record.wzryVideoTag.tagId>0) {
            return (
              <div>
                <Popconfirm  placement="top" onConfirm={this.onUnbind.bind(this,id)} title="确认解绑？" okText="确认" cancelText="取消">
                  <Button size="small" type="danger"><Icon type="disconnect" />解绑</Button>
                </Popconfirm>
                <span style={{padding: "6px"}}></span>
                <a href={record.url} target="_blank">腾讯观看</a>
              </div>
            )
          }else {
            return (
              <div>
                <BindTag videoId={id} />
                <span style={{padding: "6px"}}></span>
                <a href={record.url} target="_blank">腾讯观看</a>
              </div>
            )
          }
        }
      }]
    }
  }

  componentWillMount () {
    let params = {
      page: 1,
      size: 10
    };
    getVideosAll(params).then(data => {
      let pagination = this.state.pagination;
      pagination.total = data.data.data.totalItem;
      this.setState({
        loading: false,
        dataSource: data.data.data.data,
        pagination
      });
    });

    getTagList().then(data => {
      this.setState({
        tagList: data.data.data
      })
    })

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

  handleTableChange = (pagination,filters, soter) => {
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

    if(this.state.tagId > 0) {
      params.tagId = this.state.tagId
      getVideoByTag(params).then(data => {
        let pagination = this.state.pagination;
        pagination.total = data.data.data.totalItem;
        this.setState({
          loading: false,
          dataSource: data.data.data.data,
          pagination
        });
      })
    }else {
      getVideosAll(params).then(data => {
        let pagination = this.state.pagination;
        pagination.total = data.data.data.totalItem;
        this.setState({
          loading: false,
          dataSource: data.data.data.data,
          pagination
        });
      });
    }
    
  };

  gotoLink = (v) => {
    location.hash = v;
  };

  handleBindChange = (e) => {
    let v = e.target.value;
    v = +v;
    
    this.setState({
      tagId: v
    })

    let params = {
      page: 1,
      size: 10
    }

    if(v > 0) {
      params.tagId = v;
      getVideoByTag(params).then(data => {
        let pagination = this.state.pagination;
        pagination.total = data.data.data.totalItem;
        this.setState({
          loading: false,
          dataSource: data.data.data.data,
          pagination
        });
      })
    }else {
      getVideosAll(params).then(data => {
        let pagination = this.state.pagination;
        pagination.total = data.data.data.totalItem;
        this.setState({
          loading: false,
          dataSource: data.data.data.data,
          pagination
        });
      });
    }

  }

  onUnbind = (vid) => {
    vid = +vid;
    let params = {
      videoId: vid,
      tagId: +this.state.tagId,
      bind: false
    }

    bindTag2Video(params).then(data => {
       message.success("解绑成功")
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
              <Button onClick={this.gotoLink.bind(this,'#tags')}>标签管理</Button>
              <Button type="primary">视频管理</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row style={{marginTop: '30px'}}>
          <Col span={this.state.tagList.length * 2}>
            <RadioGroup defaultValue={"0"} onChange={this.handleBindChange}>
              <RadioButton key="0" value={"0"}>全部</RadioButton>
              {
                this.state.tagList.map(v => {
                  return <RadioButton key={v.id} value={v.id}>{v.name}</RadioButton>
                })
              }
            </RadioGroup>
          </Col>
        </Row>
        <Row>
          <Col span='24' style={{marginTop: '10px'}}>
            <Table
              pagination={this.state.pagination}
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              onChange={this.handleTableChange}
              loading={this.state.loading}
              rowKey="id"
              bordered/>
          </Col>
        </Row>
      </div>
    );
  }
}

Videos.propTypes = {
};

export default connect()(Videos);

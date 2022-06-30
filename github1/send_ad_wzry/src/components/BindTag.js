import React from 'react';
import {Button, Modal, Form, Input, Icon, message,Table} from 'antd';
import { bindWxGroup, getGroupList, getTagList, bindTag2Video} from '../services/interface';
import BindButton from './bindButton';

export default class BindTag extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      addModalVisible: false,
      source: '',
      dataSource: [],
      pagination: {},
      loading:true,
      columns: [{
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },{
          title: '标签',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: '绑定',
          dataIndex: 'id',
          key: 'BindId',
          render: (id, row, index) => {
            return (
              <Button onClick={this.bindTagToVideo.bind(this, id)}>绑定</Button>
            )
        }
      }]
    };
  }

  addModalVisible = () => {
    this.setState({
      addModalVisible: !this.state.addModalVisible
    })
  };

  handleHideAdd = () => {
    this.setState({
      addModalVisible: false
    })
  };

  bindTagToVideo = (tagId) => {
    const { videoId } = this.props;
    let params = {
      tagId: tagId,
      videoId: videoId,
      bind: true
    }

    bindTag2Video(params).then(data => {
      console.log(data)
      if(data.status == 200) {
        message.success("绑定成功!");
        setTimeout(_ => {
          location.reload(true);
        }, 800);
      }
    })
  }

  getTagLists = () => {
    getTagList().then(data => {
      this.setState({
        dataSource: data.data.data
      });
    });
    this.setState({
      addModalVisible: !this.state.addModalVisible
    })
  }

  render () {
    return (
      <div style={{display: "inline-block"}}>
       <Button size="small" type="primary" onClick={this.getTagLists}><Icon type="link" />绑定</Button>  
        <Modal
          title='绑定标签'
          onCancel={this.handleHideAdd}
          onOk={this.handleHideAdd}
          visible={this.state.addModalVisible}>
          <Table
            size="small"
            pagination={this.state.pagination}
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            rowKey="id"
            bordered/>
        </Modal>
      </div>
    )
  }

};

import {
  Card,
  Button,
  Icon,
  Table,
  Modal,
  Row,
  Form,
  Input,
  DatePicker,
  Switch,
  Upload,
  message
} from 'antd';
import React,
{ PropTypes } from 'react';
import moment from 'moment';
import '../style/groupManage.css';
const FormItem = Form.Item;

export default class Groups extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      layerClassName: 'layer',
      operateType: 'add',
      currentGroup: {
        name: '',
        id: null,
        memberNum: 0,
        memberMaxNum: 0,
        avatar: '',
        onlyRobotPull: 0,
        qrcodeUrl: '',
        invalidDate: 0
      },
      pager: {
        current: 1,
        size: 10,
        total: 0
      },
      viewGroupId: '',
      onedayMaxPullNum: 0,
      bindGroupId: '',
      wxId: '',
      wxAccount: null,
      name: '',
      avatar: '',
      groupAvatar: [],
      headImg: '',
      uuid: '',
      addMemberReply: '',
      isLogin: false,
      addLoading: false,
      submitLoading: false,
      fileList: [],
      robotCode: [],
      modalVisible: false,
      bindModalVisible: false
    };
  }
  componentWillMount () {
    this.props.openSocket();
    this.props.getAllGroups({page: this.state.pager.current - 1, size: this.state.pager.size});
  }
  componentWillReceiveProps (nextPorps) {
    console.log(Object.assign(this.state.pager, {
      total: nextPorps.totalItem
    }));
    this.setState({
      submitLoading: false,
      modalVisible: false,
      bindModalVisible: false,
      wxId: '',
      wxAccount: null,
      name: '',
      avatar: '',
      headImg: '',
      uuid: '',
      groupName: '',
      addMemberReply: '',
      pager: Object.assign(this.state.pager, {
        total: nextPorps.totalItem
      }),
      isLogin: false,
      addLoading: false
    });
  }
  columns = [
    {
      title: '序号',
      key: 'index',
      width: '10%',
      render: (text, record, index) => {
        return index + 1;
      }
    }, {
      title: '群名称',
      width: '40%',
      key: 'name',
      dataIndex: 'name'
    }, {
      title: '群人数',
      key: 'memberNum',
      width: '15%',
      dataIndex: 'memberNum'
    }, {
      title: '人数上限',
      key: 'memberMaxNum',
      width: '15%',
      dataIndex: 'memberMaxNum'
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record, index) => {
        return (
          <div className='operation'>
            <Button className='edit' icon='edit' shape='circle'
              title='编辑群信息' data-id={record.id}
              onClick={this.editGroup}></Button>
            <Button className='link' icon='link' shape='circle'
              title='绑定机器人' data-id={record.id}
              data-group-name={record.name}
              onClick={this.bindRobot}></Button>
            <Button className='view'
              icon={this.state.viewGroupId === record.id ? 'eye' : 'eye-o'}
              title='查看绑定机器人' shape='circle' data-id={record.id}
              onClick={this.viewRobot}></Button>
          </div>
        );
      }
    }
  ];
  hideModal = () => {
    this.setState({
      modalVisible: false,
      bindModalVisible: false,
      fileList: [],
      groupAvatar: []
    });
  };
  editGroup = (e) => {
    let groupId = null;
    if (e.target.nodeName === 'I') {
      groupId = e.target.parentElement.dataset.id | 0;
    } else {
      groupId = e.target.dataset.id | 0;
    }
    this.props.groups.forEach(group => {
      if (group.id === (groupId | 0)) {
        console.log(Object.assign({}, group));
        group.invalidDate = new moment(group.invalidDate);
        this.setState({
          operateType: 'edit',
          currentGroup: Object.assign({}, group),
          groupAvatar: group.avatar ? [{
            uid: -1,
            name: '群头像.png',
            state: 'done',
            url: group.avatar
          }] : [],
          fileList: group.qrcodeUrl ? [{
            uid: -1,
            name: '群二维码.png',
            status: 'done',
            url: group.qrcodeUrl
          }] : [],
          modalVisible: true
        });
      }
    });
    setTimeout(_ => {console.log('23232323'); console.log(this.state.currentGroup.onlyRobotPull)}, 2000)
  };
  onGroupNameChange = (e) => {
    this.setState({
      currentGroup: Object.assign(this.state.currentGroup, {name: e.target.value})
    });
  };
  onUploadChange = (e) => {
    this.setState({
      currentGroup: Object.assign(this.state.currentGroup, {fileField: e.target})
    });
  };
  onTimeChange = (value) => {
    this.setState({
      currentGroup: Object.assign(this.state.currentGroup, {invalidDate: value})
    });
  };
  onLimitChange = (e) => {
    this.setState({
      currentGroup: Object.assign(this.state.currentGroup, {memberMaxNum: e.target.value | 0})
    });
  };
  onMaxPullChange = (e) => {
    this.setState({
      onedayMaxPullNum: e.target.value | 0
    });
  };
  handleAddRepChange = (e) => {
    this.setState({
      addMemberReply: e.target.value
    });
  };
  handleWxAccChange = (e) => {
    this.setState({
      wxAccount: e.target.value
    });
  };
  handleOnlyRobotPullChange = (checked) => {
    if (checked) {
      this.setState({
        currentGroup: Object.assign(this.state.currentGroup, {onlyRobotPull: 1})
      });
    } else {
      this.setState({
        currentGroup: Object.assign(this.state.currentGroup, {onlyRobotPull: 0})
      });
    }
  }
  addGroup = () => {
    this.setState({
      operateType: 'add',
      modalVisible: true,
      currentGroup: {
        name: null,
        id: null,
        memberNum: null,
        onlyRobotPull: 0,
        memberMaxNum: null,
        qrcodeUrl: null,
        invalidDate: null
      },
      fileList: [],
      groupAvatar: []
    });
  };
  bindRobot = (e) => {
    let groupId = '';
    let groupName = '';
    if (e.target.nodeName === 'I') {
      groupId = e.target.parentElement.dataset.id | 0;
      groupName = e.target.parentElement.dataset.groupName;
    } else {
      groupId = e.target.dataset.id | 0;
      groupName = e.target.dataset.groupName;
    }
    this.setState({
      bindModalVisible: true,
      uuid: '',
      avatar: '',
      bindGroupId: groupId,
      groupName,
      layerClassName: 'layer'
    });
    // 发送请求，获取uuid
    if (this.props.socket) {
      let socket = this.props.socket;
      socket.emit('bind-robot');
      socket.off('avatar');
      socket.off('login');
      socket.off('contact-update');
      socket.off('send-uuid');
      socket.on('send-uuid', data => {
        this.setState({
          uuid: data.uuid,
          layerClassName: 'layer get-uuid'
        });
      });
      socket.on('avatar', data => {
        this.setState({
          layerClassName: 'layer scanned',
          uuid: '',
          avatar: data.avatar
        });
      });
      socket.on('login', data => {
        this.setState({
          layerClassName: 'layer get-uuid',
          isLogin: true,
          name: data.name
        });
      });
    } else {
      message.error('服务器链接异常，无法获取二维码!');
    }
  };
  viewRobot = (e) => {
    let groupId = '';
    if (e.target.nodeName === 'I') {
      groupId = e.target.parentElement.dataset.id | 0;
    } else {
      groupId = e.target.dataset.id | 0;
    }
    this.setState({
      viewGroupId: groupId
    });
    this.props.viewRobot(groupId);
  };
  handleOk = () => {
    this.setState({
      submitLoading: true
    });
    let params = null;
    if (this.state.operateType === 'edit') {
      console.log(this.state.fileList);
      params = {
        ...this.state.currentGroup
      };
      if (this.state.fileList[0] && this.state.fileList[0].url) {
        params.qrcodeUrl = this.state.fileList[0].url;
      } else {
        params.qrcodeUrl = null;
      }
      if (this.state.groupAvatar[0] && this.state.groupAvatar[0].url) {
        params.avatar = this.state.groupAvatar[0].url;
      } else {
        params.avatar = null;
      }
    } else if (this.state.operateType === 'add') {
      params = {
        name: this.state.currentGroup.name,
        memberNum: -1,
        avatar: (this.state.groupAvatar[0] && this.state.groupAvatar[0].url) || null,
        memberMaxNum: this.state.currentGroup.memberMaxNum,
        onlyRobotPull: this.state.currentGroup.onlyRobotPull,
        qrcodeUrl: (this.state.fileList[0] && this.state.fileList[0].url) || null,
        invalidDate: this.state.currentGroup.invalidDate
      };
    }
    this.props.onSubmit(params, this.state.operateType);
    this.setState({
      modalVisible: false,
      submitLoading: false
    });
  };
  handleAddRobotOk = () => {
    this.setState({
      addLoading: true
    });
    // 将头像上传七牛云
    let decode = atob(this.state.avatar.split(',')[1]);
    // let mime = 'image/jpeg';
    let len = decode.length;
    let dataArr = new Int8Array(len);
    for (let i = 0; i < len; i++) {
      dataArr[i] = decode.charCodeAt(i);
    }
    // let fileBlob = new Blob(dataArr, {type: mime});
    let params = {
      wxId: this.state.wxId,
      wxAccount: this.state.wxAccount,
      addMemberReply: this.state.addMemberReply,
      onedayMaxPullNum: this.state.onedayMaxPullNum,
      name: this.state.name,
      bindGroupId: this.state.bindGroupId,
      avatar: dataArr,
      qrcodeUrl: this.state.robotCode[0].url,
      currentGroup: this.state.currentGroup,
      groupName: this.state.groupName,
      socket: this.props.socket
    };
    this.props.addRobotRequest(params);
    this.setState({
      addLoading: false,
      bindModalVisible: false
    });
  };
  handleTableChange = (pager) => {
    this.props.getAllGroups({page: pager.current - 1, size: this.state.pager.size});
    this.setState({
      pager: Object.assign(this.state.pager, {
        current: pager.current
      })
    });
  };
  handleChange = ({ fileList }) => {
    if (fileList.length === 0) {
      this.setState({fileList});
    } else {
      this.setState({
        fileList: [{
          uid: fileList[0].uid,
          name: fileList[0].name,
          status: fileList[0].status,
          url: (fileList[0].response && fileList[0].response.data.url) || ''
        }]
      });
    }
  };
  handleGpAvatarChange = ({ fileList }) => {
    if (fileList.length === 0) {
      this.setState({groupAvatar: fileList});
    } else {
      this.setState({
        groupAvatar: [{
          uid: fileList[0].uid,
          name: fileList[0].name,
          status: fileList[0].status,
          url: (fileList[0].response && fileList[0].response.data.url) || ''
        }]
      });
    }
  };
  handleRobotCdChange = ({fileList}) => {
    if (fileList.length === 0) {
      this.setState({robotCode: fileList});
    } else {
      this.setState({
        robotCode: [{
          uid: fileList[0].uid,
          name: fileList[0].name,
          status: fileList[0].status,
          url: (fileList[0].response && fileList[0].response.data.url) || ''
        }]
      });
    }
  };
  render () {
    return (
      <div>
        <Card title={(
          <div className='title'>
            <span className='name'>微信群</span>
            <Button
              className='add-group'
              type='default'
              onClick={this.addGroup}>添加</Button>
          </div>
        )}>
          <Table
            dataSource={this.props.groups}
            scroll={{y: 420}}
            pagination={this.state.pager}
            onChange={this.handleTableChange}
            columns={this.columns}></Table>
        </Card>
        <Modal
          title={this.state.operateType === 'add' ? '添加群信息' : '更新群信息'}
          onCancel={this.hideModal}
          onOk={this.handleOk}
          footer={[
            <Button key='back' onClick={this.hideModal}>取消</Button>,
            <Button key='submit' type='primary' loading={this.state.submitLoading} onClick={this.handleOk}>
              确定
            </Button>
          ]}
          visible={this.state.modalVisible}>
          <Form layout='horizontal' id='groupForm'>
            <Row>
              <FormItem
                label='群名称'
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}>
                <Input
                  placeholder='请填写群名称'
                  value={this.state.currentGroup.name}
                  disabled={this.state.operateType !== 'add'}
                  onChange={this.onGroupNameChange}></Input>
              </FormItem>
            </Row>
            <Row>
              <FormItem label='群头像'
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}>
                <Upload
                  action='http://qf-restapi.mdscj.com/product/image/save'
                  listType='picture-card'
                  name='imageFile'
                  fileList={this.state.groupAvatar}
                  onChange={this.handleGpAvatarChange}>
                  {this.state.groupAvatar.length > 0 ? null :
                    (<div>
                      <Icon type='plus'></Icon>
                      <div className='ant-upload-text'>Upload</div>
                    </div>)}
                </Upload>
                <Input type='file' onChange={this.onUploadChange} name='file' id='upload' style={{display: 'none'}}></Input>
              </FormItem>
            </Row>
            <Row>
              <FormItem label='群二维码'
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}>
                <Upload
                  action='http://qf-restapi.mdscj.com/product/image/save'
                  listType='picture-card'
                  name='imageFile'
                  fileList={this.state.fileList}
                  onChange={this.handleChange}>
                  {this.state.fileList.length > 0 ? null :
                    (<div>
                      <Icon type='plus'></Icon>
                      <div className='ant-upload-text'>Upload</div>
                    </div>)}
                </Upload>
                <Input type='file' onChange={this.onUploadChange} name='file' id='upload' style={{display: 'none'}}></Input>
              </FormItem>
            </Row>
            <Row>
              <FormItem label='仅派发机器人二维码'
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}>
                <Switch checked={this.state.currentGroup.onlyRobotPull === 1} onChange={this.handleOnlyRobotPullChange} />
              </FormItem>
            </Row>
            <Row>
              <FormItem label='失效时间'
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}>
                <DatePicker onChange={this.onTimeChange} value={this.state.currentGroup.invalidDate}/>
              </FormItem>
            </Row>
            <Row>
              <FormItem label='人数上限'
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}>
                <Input type='number' onChange={this.onLimitChange} value={this.state.currentGroup.memberMaxNum}/>
              </FormItem>
            </Row>
          </Form>
        </Modal>
        <Modal
          title='添加机器人'
          layout='horizontal'
          id='robotsForm'
          onCancel={this.hideModal}
          visible={this.state.bindModalVisible}
          footer={[
            <Button key='back' onClick={this.hideModal}>取消</Button>,
            <Button
              key='submit'
              type='primary'
              disabled={!this.state.isLogin}
              loading={this.state.addLoading}
              onClick={this.handleAddRobotOk}>
              确定
            </Button>,
          ]}
          >
          <Form>
            <Row>
              <div className='img-wrapper' id='loginQdUrl'>
                <div className={this.state.layerClassName}>
                  {
                    !this.state.uuid ?
                    (
                      <Icon className='icon' type='loading'>
                        <p className='tip'>二维码获取中</p>
                      </Icon>
                    ) : null
                  }
                </div>
                <img alt='' src={
                  this.state.uuid ?
                  `https://login.weixin.qq.com/qrcode/${this.state.uuid}` :
                  (this.state.avatar ? this.state.avatar : '')} />
              </div>
            </Row>
            <Row>
              <FormItem label='每日限额'>
                <Input
                  placeholder='该机器人每天添加的粉丝上限'
                  value={this.state.onedayMaxPullNum}
                  onChange={this.onMaxPullChange} />
              </FormItem>
            </Row>
            <Row>
              <FormItem label='机器人二维码'>
                <Upload
                  action='http://qf-restapi.mdscj.com/product/image/save'
                  listType='picture-card'
                  name='imageFile'
                  fileList={this.state.robotCode}
                  onChange={this.handleRobotCdChange}>
                  {this.state.robotCode.length > 0 ? null :
                    (<div>
                      <Icon type='plus'></Icon>
                      <div className='ant-upload-text'>Upload</div>
                    </div>)}
                </Upload>
              </FormItem>
            </Row>
            <Row>
              <FormItem label='微信号'>
                <Input
                  placeholder='请输入微信号，用来标识绑定微信机器人'
                  value={this.state.wxAccount}
                  onChange={this.handleWxAccChange}></Input>
              </FormItem>
            </Row>
            <Row>
              <FormItem>
                <Input
                  type='textarea'
                  rows={8}
                  value={this.state.addMemberReply}
                  onChange={this.handleAddRepChange}
                  placeholder='成功添加好友默认回复'></Input>
              </FormItem>
            </Row>
          </Form>
        </Modal>
      </div>
    )
  }
}

Groups.propTypes = {
  groups: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
};
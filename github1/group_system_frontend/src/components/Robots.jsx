import { Card,
  Button,
  Row,
  Modal,
  Form,
  Input,
  Popconfirm,
  Upload,
  message,
  Table,
  Icon } from 'antd';
import React, { PropTypes } from 'react';
import '../style/robotManage.css';
const FormItem = Form.Item;

export default class Robots extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      wxId: '',
      wxAccount: null,
      name: '',
      avatar: '',
      robots: [],
      uuid: '',
      robotOperateType: '',
      operation: 'update',
      robotCode: [],
      groupName: '',
      groupAvatar: '',
      robotId: '',
      addMemberReply: '',
      onedayMaxPullNum: 0,
      modalVisible: false,
      layerClassName: 'layer',
      isLogin: false,
      updateModalVisible: false
    };
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      robots: Object.assign([], nextProps.robots)
    });
  }
  hideModal = () => {
    this.setState({
      modalVisible: false,
      updateModalVisible: false,
    });
  };
  handleRmRobot = (e) => {
    let robotId = null;
    let params = null;
    if (e.target.nodeName === 'I') {
      robotId = e.target.parentNode.dataset.id | 0;
    } else if (e.target.nodeName === 'BUTTON') {
      robotId = e.target.dataset.id | 0;
    }
    // 获取联系人信息
    this.props.robots.forEach(robot => {
      if (robot.id === robotId) {
        params = {
          wxId: robot.wxId,
          wxAccount: robot.wxAccount,
          addMemberReply: robot.addMemberReply,
          onedayMaxPullNum: robot.onedayMaxPullNum,
          name: robot.name,
          robotId: robotId,
          bind: false,
          qrcodeUrl: robot.qrcodeUrl,
          bindGroupId: this.props.groupId,
          avatar: robot.avatar
        };
      }
    });
    this.props.onSubmit(params);
    this.props.viewRobot(this.props.groupId);
  };
  handleUpdateOk = () => {
    let params = {
      wxId: this.state.wxId,
      wxAccount: this.state.wxAccount,
      addMemberReply: this.state.addMemberReply,
      onedayMaxPullNum: this.state.onedayMaxPullNum,
      name: this.state.name,
      robotId: this.state.robotId,
      qrcodeUrl: this.state.robotCode[0] && this.state.robotCode[0].url || '',
      bindGroupId: this.props.groupId,
      avatar: this.state.avatar
    };
    this.setState({
      updateModalVisible: false
    });
    this.props.onSubmit(params);
    this.props.viewRobot(this.props.groupId);
  };
  handleExit = (e) => {
    let robotId = null;
    if (e.target.nodeName === 'I') {
      robotId = e.target.parentNode.dataset.id | 0;
    } else if (e.target.nodeName === 'BUTTON') {
      robotId = e.target.dataset.id | 0;
    }
    this.setState({
      robotId: robotId
    });
  };
  handleExitOk = (e) => {
    console.log(this.state.robotId);
    this.props.socket.emit('exit-robot', {robotId: this.state.robotId});
  };
  handleRobotCdChange = ({fileList}) => {
    if (fileList) {
      this.setState({robotCode: []});
    } else {
      this.setState({
        robotCode: [{
          uid: fileList[0].uid,
          name: fileList[0].name,
          url: fileList[0].response.data.url,
          status: fileList[0].status
        }]
      })
    }
  };
  handleLogin = (e) => {
    let robotId = e.target.dataset.id | 0;
    console.log(this.props);
    this.props.groups.forEach(group => {
      if (group.id === this.props.groupId) {
        this.setState({
          groupName: group.name,
          groupQrcodeUrl: group.qrcodeUrl,
          memberMaxNum: group.memberMaxNum,
          groupAvatar: group.avatar,
          invalidDate: group.invalidDate
        });
      }
    });
    this.setState({
      updateModalVisible: true,
      robotId,
      operation: 'login'
    });
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
          name: data.nickName
        });
      });
      socket.on('bind-success', data => {
        let robotId = data.robotId | 0;
        this.state.robots.forEach((robot, index) => {
          if (robot.id === robotId) {
            this.state.robots[index].status = 'online';
            this.forceUpdate();
          }
        });
      });
      socket.on('exit-succeed', data => {
        let robotId = data.robotId | 0;
        this.state.robots.forEach((robot, index) => {
          if (robot.id === robotId) {
            this.state.robots[index].status = '';
            this.forceUpdate();
          }
        });
      });
      this.props.robots.forEach(robot => {
        if (robot.id === robotId) {
          this.setState({
            wxId: robot.wxId,
            wxAccount: robot.wxAccount,
            name: robot.name,
            robotCode: [{
              uid: -1,
              name: '机器人二维码.png',
              status: 'done',
              url: robot.qrcodeUrl
            }],
            avatar: robot.avatar,
            addMemberReply: robot.addMemberReply,
            onedayMaxPullNum: robot.onedayMaxPullNum
          });
        }
      });
    } else {
      message.error('服务器链接异常，无法获取二维码!');
    }
  };
  handleLoginOk = () => {
    this.props.socket.emit('update-bind', {
      robotId: this.state.robotId,
      avatar: this.state.groupAvatar,
      groupName: this.state.groupName,
      addMemberReply: this.state.addMemberReply,
      groupId: this.props.groupId,
      groupQrcodeUrl: this.state.groupQrcodeUrl,
      memberMaxNum: this.state.memberMaxNum,
      invalidDate: this.state.invalidDate
    });
    this.setState({
      updateModalVisible: false
    });
  };
  handleUpdate = (e) => {
    let robotId = null;
    let type = '';
    if (e.target.nodeName === 'I') {
      robotId = e.target.parentNode.dataset.id | 0;
    } else if (e.target.nodeName === 'BUTTON') {
      robotId = e.target.dataset.id | 0;
    }
    this.setState({
      updateModalVisible: true,
      operation: 'update'
    });
    // 获取联系人信息
    this.props.robots.forEach(robot => {
      if (robot.id === robotId) {
        this.setState({
          wxId: robot.wxId,
          wxAccount: robot.wxAccount,
          name: robot.name,
          avatar: robot.avatar,
          robotCode: [{
            uid: -1,
            name: '机器人二维码.png',
            status: 'done',
            url: robot.qrcodeUrl
          }],
          addMemberReply: robot.addMemberReply,
          onedayMaxPullNum: robot.onedayMaxPullNum
        });
      }
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
  columns = [{
    key: 'avatar',
    width: '70px',
    render: (text, record) => {
      console.log(record);
      return (
        <div className="avatar-wrapper">
          <img className='avatar' src={record.avatar} alt=''/>
          <span className={'status ' + (!record.status ? '' : record.status)}
            onClick={!record.status && this.handleLogin} data-id={record.id}></span>
        </div>
      );
    }
  }, {
    key: 'robotName',
    render: (text, record) => {
      return (
        <div>
          <div>
            <span className='robot-name'>{record.name}</span>
          </div>
          <div>
            <span className='limit'>今日限额{record.onedayMaxPullNum}</span>
          </div>
        </div>
      );
    }
  }, {
    key: 'operation',
    width: '140px',
    render: (text, record) => {
      return (
        <div>
          <Button icon='edit' shape='circle' title='编辑机器人信息'
            onClick={this.handleUpdate} data-id={record.id}
            className='edit'></Button>
          <Button icon='delete' shape='circle' title='解除绑定'
            data-id={record.id} className='edit' data-type='remove'
            onClick={this.handleRmRobot}></Button>
          <Popconfirm placement="top"
            title='确认退出该机器人？' onConfirm={this.handleExitOk}
            okText="确定" cancelText="取消">
            <Button icon='logout' shape='circle' title='退出登录'
              onClick={this.handleExit} data-id={record.id}
              className='exit'></Button>
          </Popconfirm>
        </div>
      );
    }
  }];
  render () {
    return (
      <div>
        <Card title={(
          <div className='title'>
            <span className='name'>客服机器人</span>
            {/*<Button
              className='add-robot'
              onClick={this.addRobot}
              type='default'>添加</Button>*/}
          </div>
        )}>
          <Table dataSource={this.state.robots}
            scroll={{y: 416}}
            className='robot-info' showHeader={false}
            columns={this.columns}></Table>
        </Card>
        <Modal
          title='更新机器人信息'
          layout='horizontal'
          id='robotsForm'
          onCancel={this.hideModal}
          visible={this.state.updateModalVisible}
          footer={[
            <Button key='back' onClick={this.hideModal}>取消</Button>,
            <Button
              key='submit'
              type='primary'
              disabled={this.state.operation === 'login' && !this.state.isLogin}
              onClick={this.state.operation === 'update' ? this.handleUpdateOk : this.handleLoginOk}>
              确定
            </Button>,
          ]}
          >
          <Form>
            {
              this.state.operation === 'update' ?
              (
                <Row>
                  <div className='img-wrapper avatar'>
                    <img src={this.state.avatar} alt=''/>
                  </div>
                </Row>
              ) :
              (
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
              )
            }
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
                  disabled></Input>
              </FormItem>
            </Row>
            <Row>
              <FormItem>
                <Input
                  type='textarea'
                  rows={6}
                  value={this.state.addMemberReply}
                  onChange={this.handleAddRepChange}
                  placeholder='成功添加好友默认回复'></Input>
              </FormItem>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

Robots.propTypes = {
  robots: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
};
import React from 'react';
import {Modal, Row, Col, Button, Icon, Radio} from 'antd';
import Upload from '../components/upload.jsx';
import AddItem from '../components/addItem.jsx';
import Search from '../components/search.jsx';
import Info from '../components/info.jsx';
import {getData, getWxAccount} from '../factory/interface';
import QRcode from 'arale-qrcode';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      codeVisible: false,
      addModalVisible: false,
      pagination: {},
      addType: 'add',
      editData: null,
      loading: true,
      isSearchOpen: false,
      source: 'scan',  // 默认读取扫码记录
      url: ''
    };
  }
  componentWillMount () {
    let params = {
      page: 1,
      size: 10
    };
    getData(params).then(data => {
      let pagination = this.state.pagination;
      pagination.total = data.data.data.totalItem;
      this.setState({
        loading: false,
        data: data.data.data.data,
        pagination
      });
    });
  }
  handleTableChange = (pagination, filters, soter) => {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    let params = {
      page: pagination.current,
      size: 10,
      scanTimeStart: this.state.scanTimeStart,
      scanTimeEnd: this.state.scanTimeEnd,
      createdAtStart: this.state.createdAtStart,
      createdAtEnd: this.state.createdAtEnd,
      groupQrcodeStatus: this.state.groupQrcodeStatus,
      wxAccount: this.state.wxAccount,
      scanQrcodeStatus: this.state.scanQrcodeStatus
    };
    getData(params).then(data => {
      let pagination = this.state.pagination;
      pagination.total = data.data.data.totalItem;
      this.setState({
        loading: false,
        data: data.data.data.data,
        pagination
      });
    });
  };
  handleSearch = (params) => {
    getData(params).then(data => {
      let pagination = this.state.pagination;
      pagination.current = 1;
      pagination.total = data.data.data.totalItem;
      this.setState({
        loading: false,
        data: data.data.data.data,
        pagination,
        scanTimeStart: params.scanTimeStart,
        scanTimeEnd: params.scanTimeEnd,
        createdAtStart: params.createdAtStart,
        createdAtEnd: params.createdAtEnd,
        wxAccount: params.wxAccount,
        groupQrcodeStatus: params.groupQrcodeStatus,
        scanQrcodeStatus: params.scanQrcodeStatus
      });
    });
  };
  largeQRcode = (qrcodeUrl) => {
    this.setState({
      codeVisible: true,
      url: qrcodeUrl
    });
  };
  handleCancel = () => {
    this.setState({
      codeVisible: false
    });
  };
  handleOk = () => {
    this.setState({
      codeVisible: false
    });
  };
  toggleSearch = (isSearchOpen) => {
    this.setState({
      isSearchOpen
    });
  };
  handleSourceChange = (e) => {
    let value = e.target.value;
    this.setState({
      source: value
    });
    if (value === 'scan') {
      let params = {
        page: 1,
        size: 10
      };
      getData(params).then(data => {
        let pagination = this.state.pagination;
        pagination.total = data.data.data.totalItem;
        this.setState({
          loading: false,
          data: data.data.data.data,
          pagination
        });
      });
    } else if (value === 'wxAccount') {
      let params = {
        page: 1,
        size: 10
      };
      this.setState({
        loading: true
      });
      getWxAccount(params).then(data => {
        let pagination = this.state.pagination;
        pagination.total = data.data.data.totalItem;
        pagination.current = 1;
        this.setState({
          data: data.data.data.data,
          loading: false
        });
      });
    }
  };
  handleHideAdd = () => {
    this.setState({
      addModalVisible: false
    });
  };
  handleDisplayAdd = (type, data) => {
    if (type === 'edit') {
      this.setState({
        addType: 'edit',
        addModalVisible: true,
        editData: data
      });
    } else if (type === 'add') {
      this.setState({
        addType: 'add',
        addModalVisible: true,
        editData: null
      });
    }
  };
  getColumns = (source) => {
    let columns = null;
    if (source === 'scan') {
      columns = [{
        title: '二维码URL',
        key: 'qrcodeUrl',
        dataIndex: 'qrcodeUrl',
        onCellClick: (record, event) => {
          this.largeQRcode(record.qrcodeUrl);
        },
        render: (url, row, index) => {
          return (
            <img src={url}/>
          )
        }
      },{
        title: '群名称',
        key: 'name',
        dataIndex: 'name'
      },{
        title: '群备注',
        key: 'remark',
        dataIndex: 'remark'
      },{
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (text, record, index) => {
          if (text === 'SCANED') {
            return '已扫描';
          } else if (text === 'NO_SCAN') {
            return '未扫码';
          } else {
            return '--';
          }
        }
      },{
        title: '扫码者微信号',
        key: 'wxAccount',
        dataIndex: 'weixinScanRecord',
        render: (weixinScanRecord) => {
          if (weixinScanRecord) {
            return weixinScanRecord.wxAccount;
          } else {
            return '--';
          }
        }
      },{
        title: '扫码者微信名称',
        key: 'wxName',
        dataIndex: 'weixinScanRecord',
        render: (weixinScanRecord) => {
          if (weixinScanRecord) {
            return weixinScanRecord.wxName;
          } else {
            return '--';
          }
        }
      },{
        title: '扫描时间',
        key: 'scanTime',
        dataIndex: 'scanTime',
        render (text) {
          if (text) {
            let date = new Date(text);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
          } else {
            return '--';
          }
        }
      },{
        title: '扫码结果',
        key: 'weixinScanRecord',
        dataIndex: 'weixinScanRecord',
        render: (scanRecord, record, index) => {
          if (scanRecord && scanRecord.scanResult) {
            return scanRecord.scanResult;
          } else {
            return '--';
          }
        }
      }];
    } else if (source === 'wxAccount') {
      columns = [{
        title: '微信账号',
        key: 'wxAccount',
        dataIndex: 'wxAccount',
        onCellClick: (record, event) => {
          this.handleDisplayAdd('edit', record);
        },
        render: (value, record) => {
          return (
            <a>{value}</a>
          );
        }
      },{
        title: '微信ID',
        key: 'wxId',
        dataIndex: 'wxId'
      },{
        title: '微信名称',
        key: 'wxName',
        dataIndex: 'wxName'
      },{
        title: '最大成功入群数',
        key: 'groupMaxCount',
        dataIndex: 'groupMaxCount'
      },{
        title: '成功入群数',
        key: 'groupSuccessCount',
        dataIndex: 'groupSuccessCount'
      },{
        title: '总计扫描次数',
        key: 'groupScanCount',
        dataIndex: 'groupScanCount'
      },{
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (value) => {
          let date = new Date(value);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
      },{
        title: '任务最近更新时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        render: (value) => {
          if (value) {
            let date = new Date(value);
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          } else {
            return '--';
          }
        }
      }]
    }
    return columns;
  };
  render () {
    return (
      <div>
        <Row>
          <Col span='18' push='3'>
            <Row>
              <header style={{
                lineHeight: '80px',
                background: '#333',
                paddingLeft: '20px',
                fontSize: '22px',
                color: '#ccc',
                marginBottom: '20px'}}>
                <p>扫码结果</p>
              </header>
            </Row>
            <Row>
              <Col span='2'>
                <Upload></Upload>
              </Col>
              <Col span='2'>
                <AddItem
                  addType={this.state.addType}
                  editData={this.state.editData}
                  handleDisplayAdd={this.handleDisplayAdd}
                  handleHideAdd={this.handleHideAdd}
                  addModalVisible={this.state.addModalVisible}></AddItem>
              </Col>
              <Col span='20'>
                <Search source={this.state.source} handleSearch={this.handleSearch} toggleSearch={this.toggleSearch}></Search>
              </Col>
            </Row>
            <Row style={{marginTop: '24px', marginBottom: '10px'}}>
              <RadioGroup defaultValue='scan' onChange={this.handleSourceChange}>
                <RadioButton value='scan'>扫码记录</RadioButton>
                <RadioButton value='wxAccount'>微信账户</RadioButton>
              </RadioGroup>
            </Row>
            <Row>
              <Info
                columns={this.getColumns(this.state.source)}
                source={this.state.source}
                handleTableChange={this.handleTableChange}
                pagination={this.state.pagination}
                loading={this.state.loading}
                data={this.state.data}></Info>
            </Row>
          </Col>
        </Row>
        <Modal
          title='扫码二维码'
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          visible={this.state.codeVisible}>
          <div id='codeWrapper' style={{textAlign: 'center'}}>
            <img src={this.state.url} style={{width: '300px'}}/>
          </div>
        </Modal>
      </div>
    );
  }
};

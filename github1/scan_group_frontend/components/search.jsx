import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import {Radio, Select, Card, Row, Col, Button, Icon, Input, Form, DatePicker} from 'antd';
import '../less/search.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;

export default class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isSearchOpen: 'searchCard',
      scanQrcodeStatusList: [],
      wxAccount: '',
      groupQrcodeStatus: ''
    };
  }
  toggleSearch = () => {
    if (this.state.isSearchOpen === 'searchCard') {
      this.setState({
        isSearchOpen: 'searchCard isSearchOpen',
      });
      this.props.toggleSearch(true);
    } else {
      this.setState({
        isSearchOpen: 'searchCard',
      });
      this.props.toggleSearch(false);
    }
  };
  handleSearch = () => {
    let params = {
      page: 1,
      size: 10,
      scanTimeStart: this.state.scanTimeStart,
      scanTimeEnd: this.state.scanTimeEnd,
      createdAtStart: this.state.createdAtStart,
      groupQrcodeStatus: this.state.groupQrcodeStatus,
      createdAtEnd: this.state.createdAtEnd,
      wxAccount: this.state.wxAccount,
      scanQrcodeStatusList: this.state.scanQrcodeStatusList
    };
    Object.keys(params).forEach((key, index, thisArr) => {
      if (!params[key]) {
        delete params[key];
      }
    });
    this.props.handleSearch(params);
    this.toggleSearch();
  };
  handleCancel = () => {
    this.toggleSearch();
  };
  handleScanStartChange = (field, value) => {
    this.setState({
      scanTimeStart: value
    });
  };
  handleScanEndChange = (field, value) => {
    this.setState({
      scanTimeEnd: value
    });
  };
  handleQRinStart = (field, value) => {
    this.setState({
      createdAtStart: value
    });
  };
  handleQRinEnd = (field, value) => {
    this.setState({
      createdAtEnd: value
    });
  };
  handleStatusChange = (e) => {
    let value = e.target.value;
    if (value === 'ALL') {
      value = '';
    }
    if (value === 'SCANED') {
      this.setState({
        scanQrcodeStatusList: ["NONE", "OTHER", "EXCEED100", "NOT_FOUND", "SYSTEM_REJECT", "EXPIRED", "SUCCESS"]
      });
    } else {
      this.setState({
        scanQrcodeStatusList: []
      });
    }
    this.setState({
      groupQrcodeStatus: value
    });
  };
  /**
   * @desc ???????????????????????????
   */
  handleScanResultChange = (value) => {
    this.setState({
      scanQrcodeStatusList: value
    });
  };
  handleAccountChange = (e) => {
    this.setState({
      wxAccount: e.target.value
    });
  };
  render() {
    return (
      <div>
        <Row>
          <Col span='2'>
            <Button className={'searchBtn ' + this.props.source} type="primary" shape="circle" size="large" onClick={this.toggleSearch}>
              <Icon type="search"></Icon>
            </Button>
            <Card title='??????????????????' style={{width: '500px'}} className={this.state.isSearchOpen}>
              <Form>
                <Row>
                  <FormItem label='???????????????'>
                    <Input name='wxAccount' id='wxAccount' type='text' onChange={this.handleAccountChange}></Input>
                  </FormItem>
                </Row>
                <Row style={{marginBottom: '24px'}}>
                  <Col span='12'>
                    <RadioGroup defaultValue='ALL' onChange={this.handleStatusChange}>
                      <RadioButton value='SCANED'>?????????</RadioButton>
                      <RadioButton value='NO_SCAN'>?????????</RadioButton>
                      <RadioButton value='ALL'>??????</RadioButton>
                    </RadioGroup>
                  </Col>
                  <Col span='12'>
                    <Select
                      multiple
                      disabled={this.state.groupQrcodeStatus !== 'SCANED'}
                      onChange={this.handleScanResultChange}
                      style={{width: '100%'}}
                      value={this.state.scanQrcodeStatusList}
                      placeholder='???????????????????????????'>
                      <Option key='NONE'>??????</Option>
                      <Option key='OTHER'>??????????????????</Option>
                      <Option key='EXCEED100'>??????100???</Option>
                      <Option key='NOT_FOUND'>????????????</Option>
                      <Option key='SYSTEM_REJECT'>????????????</Option>
                      <Option key='EXPIRED'>??????</Option>
                      <Option key='SUCCESS'>??????</Option>
                    </Select>
                  </Col>
                </Row>
                <Row>
                  <Col span='12'>
                    <FormItem
                      label='??????????????????'>
                      <DatePicker
                        onChange={this.handleScanStartChange}
                        size='large'
                        ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span='12'>
                    <FormItem
                      label='??????????????????'>
                      <DatePicker
                        onChange={this.handleScanEndChange}
                        size='large'
                      ></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span='12'>
                    <FormItem
                      label='???????????????????????????'>
                      <DatePicker
                        onChange={this.handleQRinStart}
                        size='large'
                      ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span='12'>
                    <FormItem
                      label='???????????????????????????'>
                      <DatePicker
                        onChange={this.handleQRinEnd}
                        size='large'
                      ></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
                <Row className='card-footer'>
                  <Col span='4'>
                    <Button type='primary' onClick={this.handleSearch}>??????</Button>
                  </Col>
                  <Col span='4'>
                    <Button type='default' onClick={this.handleCancel}>??????</Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
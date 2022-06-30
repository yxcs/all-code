import React from 'react';
import { Link } from 'react-router';
import { Layout,Card,Row,Col,Form,Input,Button,Icon,Table,Checkbox,Switch,Select,message } from 'antd';
const { Header, Content } = Layout;
const Option = Select.Option;

import {getAllGroups,addActivity,editActivity,getActivityById} from '../interface';

class EditActivity extends React.Component {
    constructor (props) {
        super(props);
        let activityId = this.props.params.id || -1;
        this.state = {
            activityId,
            activityDetail:{
                activityDesc: null,
                activityName: null,
                lastPullNum: 0,
                pullGroupGuide: null
            },
            pagination: {},
            loading: false,
            dataSource: [],
            selectArr:[],
            textType:'groupMemberNum'
        }
    }

    componentWillMount() {
        let activityId = this.state.activityId;
        let params = {
            size:10,
            page: 0
        };
        this.setState({
            loading: true
        });
        this.getInitData(params,activityId);
    };

    getColumns = () => {
        return [{
            title: '所有群',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '选择',
            dataIndex: 'defaultCheck',
            key: 'isSelect',
            render: (value, record) => {
                return (
                    <Checkbox defaultChecked={value} id={record.id} onChange={this.onCheckBoxChange}></Checkbox>
                );
            }
        }, {
            title: '启用',
            dataIndex: 'enabled',
            key: 'isOpen',
            render: (value, record) => {
                return (
                    <Switch
                        onChange={this.onSwitchChange.bind(this,record.id)}
                        defaultChecked={value}
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren={<Icon type="cross" />}/>
                );
            }
        }];
    };

    getInitData = (params, activityId) => {
        getAllGroups(params).then(data => {
            let pagination = this.state.pagination;
            pagination.total = data.data.data.totalItem;
            let dataSource = data.data.data.data;
            this.setState({
                loading: false,
                pagination
            });
            dataSource.map(v => {
                v.enabled = true;
                v.defaultCheck = false;
                return v;
            });
            return dataSource;
        }).then(dataSource => {
            if(activityId < 0){
                this.setState({dataSource});
                return 0;
            }
            getActivityById(activityId).then(data => {
                let selectArr = this.state.selectArr;
                let activityDetail = data.data.data;
                let activityGroup = activityDetail.groupInfoList;

                this.setState({
                    activityDetail
                });

                if(activityGroup === null) {
                    this.setState({dataSource});
                    return
                }

                dataSource.map(v1 => {
                    activityGroup.forEach(v2 => {
                        if(v1.id === v2.id) {
                            v1.defaultCheck = true;
                            v1.enabled = Boolean(v2.enabled);
                            selectArr.push({groupId: v2.id,enabled: Boolean(v2.enabled),bind: true});
                        }
                    });
                    return v1;
                });

                this.setState({
                    dataSource,
                    selectArr
                })
            })
        })
    };

    onCheckBoxChange = (e)=> {
      const id = e.target.id;
      let selectArr = this.state.selectArr;
      let isExist = false;

      selectArr.map(v => {
         if(v.groupId === id) {
            isExist = true;
            v.bind = e.target.checked;
         }
         return v;
      });

      if(!isExist) {
          selectArr.push({groupId: id,enabled:true,bind:true});
      }

      this.setState({
          selectArr
      })
    };
    onSwitchChange = (value,e)=> {
      let selectArr = this.state.selectArr;
      selectArr.map(v => {
          if(v.groupId === value) {
              v.enabled = e;
          }
          return v
      });

      this.setState({
          selectArr
      });
    };

    onFormChange = (e) => {
        let type = e.target.id;
        let value = e.target.value;

        this.setState({
            activityDetail: Object.assign(this.state.activityDetail, {[type]: value})
        });
    };

    onSubmit = () => {
        let activityId = this.state.activityId;
        let {activityDetail} = this.state;
        if(this.state.activityId > 0) {
            activityDetail.activityId = activityId;
        }
        let selectArr = this.state.selectArr;
        let paramsEdit = {
            bindInfos: []
        };

        let text = (activityId > 0) ? '更新' : '添加';

        if(selectArr.length === 0){
            message.error("绑定群不可为空!");
            return
        }

        addActivity(activityDetail).then(data => {
            const id = data.data.data.id;
            selectArr.forEach((v) => {
                paramsEdit.bindInfos.push({groupId: v.groupId, enabled: v.enabled, activityId: id, bind: v.bind});
            });
            editActivity(paramsEdit).then(data => {
                message.success(`活动${text}成功，群绑定成功`);
                setTimeout(_ => {
                    location.hash ="activity_page";
                }, 800);
            }).catch(e => {
                message.warn(`活动${text}成功，群绑定失败`);
            })
        }).catch(e => {
            message.error(`活动${text}失败`);
        });

    };

    handleTableChange = (pagination) => {
        let activityId = this.state.activityId;
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
            loading: true
        });
        pagination.current--;
        let params = {
            page: pagination.current,
            size: 10
        };

        this.getInitData(params,activityId);
    };

    onSeleceChange = (e) => {
        this.setState({ textType: e });
    };

    render () {

        return (
            <Layout>
                <Header>
                    <p style={{color:'#fff'}}>活动页面配置</p>
                </Header>
                <Content className='content-main'>
                    <Row>
                        <Col span={18} push={3}>
                            <Card>
                                <Row>
                                    <Col span={24}>添加新的活动</Col>
                                    <Col span={24} style={{marginTop:"20px"}}>
                                        <Form id='activityForm'>
                                            <Form.Item
                                                label='活动名称*'
                                                labelCol={{span: 5}}
                                                wrapperCol={{span: 15}}>
                                                <Input type='text'
                                                       value={this.state.activityDetail.activityName}
                                                       name='activityName'
                                                       onChange={this.onFormChange}
                                                       id='activityName'/>
                                            </Form.Item>
                                            <Form.Item
                                                label='活动简介*'
                                                labelCol={{span: 5}}
                                                wrapperCol={{span: 15}}>
                                                <Input size='large'
                                                       value={this.state.activityDetail.activityDesc}
                                                       type='textarea' name='activityDesc'
                                                       onChange={this.onFormChange}
                                                       id='activityDesc'/>
                                            </Form.Item>
                                            <Form.Item
                                                label='文案选择*'
                                                labelCol={{span: 5}}
                                                wrapperCol={{span: 15}}>
                                                <Select showSearch
                                                        defaultValue='groupMemberNum'
                                                        onChange={this.onSeleceChange}>
                                                        <Option value="lastPullNum">距群满还有 X 人</Option>
                                                        <Option value="groupMemberNum">已有 X 人入群</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                style={{display:(this.state.textType === 'groupMemberNum'?'block':'none')}}
                                                label='入群人数*'
                                                labelCol={{span: 5}}
                                                wrapperCol={{span: 15}}>
                                                <Input type='text' value="自动获取" disabled="true"/>
                                            </Form.Item>
                                             <Form.Item
                                                style={{display:(this.state.textType === 'lastPullNum'?'block':'none')}}
                                                label='仅剩名额*'
                                                labelCol={{span: 5}}
                                                wrapperCol={{span: 15}}>
                                                <Input type='text'
                                                       value={this.state.activityDetail.lastPullNum}
                                                       name='lastPullNum'
                                                       onChange={this.onFormChange}
                                                       id='lastPullNum'/>
                                            </Form.Item>
                                            <Form.Item
                                                label='选择群*'
                                                labelCol={{span: 5}}
                                                wrapperCol={{span: 15}}>
                                                <Table dataSource={this.state.dataSource}
                                                        columns={this.getColumns()}
                                                        size="small"
                                                        rowKey="id"
                                                        loading={this.state.loading}
                                                        onChange={this.handleTableChange}
                                                       pagination={this.state.pagination}/>
                                            </Form.Item>
                                            <Form.Item
                                                label='加群引导语'
                                                labelCol={{span: 5}}
                                                wrapperCol={{span: 15}}>
                                                <Input size='large'
                                                       value={this.state.activityDetail.pullGroupGuide}
                                                       type='textarea'
                                                       name='pullGroupGuide'
                                                       onChange={this.onFormChange}
                                                       id='pullGroupGuide'/>
                                            </Form.Item>
                                        </Form>
                                        <Col span={13} push={5}><Button><Link to="activity_page">取消</Link></Button></Col>
                                        <Col span={2}>
                                            <Button type="primary" onClick={this.onSubmit}>{(this.state.activityId > 0) ? '更新' : '添加'}</Button>
                                        </Col>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                </Content>

            </Layout>
        );
    }
}

export default EditActivity
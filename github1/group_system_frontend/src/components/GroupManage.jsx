import React from 'react';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;
import '../style/groupManage.css';
import GroupsContainer from '../containers/GroupsContainer.js';
import RobotContainer from '../containers/RobotContainer.js';

export default class GroupManage extends React.Component {
  render () {
    return (
      <Layout>
        <Content className='content-main'>
          <Row gutter={16}>
            <Col span={14}>
              <GroupsContainer />
            </Col>
            <Col span={10}>
              <RobotContainer />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
};
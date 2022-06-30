import React from 'react';
import {Button, Modal, Form, Input, Icon, message} from 'antd';
import { addVideoTag } from '../services/interface';
const FormItem = Form.Item;

export default class AddTags extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
     tag: ''
    };
  }

  handleSubmit = () => {
    let params = {
        tag: this.state.tag
    }
    addVideoTag(params).then(data => {
      if (data.data.status === 1) {
        message.success('添加成功！');
      }
      setTimeout(_ => {
        location.reload(true);
      }, 800);
    });
  };

  handleClick = () => {
    this.props.handleDisplayAdd();
  };

  onInputChange = (e) => {
    this.setState({
        tag: e.target.value
    })
  }

  render () {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>
          <Icon type="plus"/>添加
        </Button>
        <Modal
          title='添加标签'
          onCancel={this.props.handleHideAdd}
          onOk={this.handleSubmit}
          visible={this.props.addModalVisible}>
          <Form
            id='groupForm'>
            <FormItem
              label='标签名称'
              labelCol={{span: 8}}
              wrapperCol={{span: 12}}>
              <Input type='text' name='name' id='name' onChange={this.onInputChange}/>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }

};

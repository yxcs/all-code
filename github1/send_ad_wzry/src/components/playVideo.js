import React from 'react';
import {Modal} from 'antd';

export default class PlayVideo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        modalVisible: false
    }
  }


  handleClick = () => {
    this.setState({
        modalVisible: !this.state.modalVisible
    })
  };

  render () {
      const { picUrl, mp4Url} = this.props;
    return (
      <div>
        <div onClick={this.handleClick} style={{cursor:"pointer"}}><img src={picUrl} style={{width: "80px",height:"auto"}} /></div>
        <Modal
          title='视频预览'
          onCancel={this.handleClick}
          onOk={this.handleClick}
          visible={this.state.modalVisible}>
          <video src={mp4Url} style={{width:"100%",height:"auto"}} controls/>
        </Modal>
      </div>
    )
  }

};

import Groups from '../components/Groups.jsx';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import {
    addGroup,
    updateGroup,
    openSocket,
    updateUuid,
    getAllGroups } from '../actions/groups.js';
import { message } from 'antd';
import * as dataInterface from '../interface.js';

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  let newProps = {
    groups: [
      ...state.groups
    ]
  };
  if (state.uuid) {
    newProps.uuid = state.uuid;
  } else {
    newProps.uuid = '';
  }
  if (state.socket) {
    newProps.socket = state.socket;
  } else {
    delete newProps.socket;
  }
  return newProps;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (group, operateType) => {
      let groupInterface = operateType === 'add' ?
        dataInterface.addGroup :
        dataInterface.updateGroup;
      // 先异步请求添加，成功后再发action
      groupInterface(group)
      .then(res => {
        console.log(res);
        // 请求成功
        if (res.data.status === 1) {
          operateType === 'add' ?
            dispatch(addGroup(group)) :
            dispatch(updateGroup(group));
        } else {
          message.error(res.data.details);
        }
      });
    },
    getAllGroups: (pager) => {
      // get data
      dataInterface.getAllGroups({
        page: pager.page,
        size: pager.size})
      .then(res => {
        console.log('get data in map state to props');
        console.log(res);
        if (res.data.status === 1) {
          dispatch(getAllGroups(res.data.data.data))
        } else {
          message.error(res.details);
        }
      }).catch(e => {
        message.error(e.message);
        dispatch(getAllGroups([]))
      });
    },
    openSocket: _ => {
      let socket = io(`${location.protocol}//${location.hostname}:${location.port}`);
      window.socket = socket;
      socket.on('send-uuid', data => {
        dispatch(updateUuid(data.uuid));
      });
      dispatch(openSocket(socket));
    }
  }
}

let GroupsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);

export default GroupsContainer;

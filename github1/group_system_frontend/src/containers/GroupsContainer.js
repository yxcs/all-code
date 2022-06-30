import Groups from '../components/Groups.jsx';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import {
  addGroup,
  updateGroup,
  updateTotalItem,
  updateViewGroupId,
  getAllGroups } from '../actions/groups.js';
import {
  openSocket,
  getBindRobots
} from '../actions/robots.js';
import { message } from 'antd';
import * as dataInterface from '../interface.js';

const mapStateToProps = (state, ownProps) => {
  console.log('----groups----');
  console.log(state)
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // 获取群绑定的机器人
  let viewRobot = groupId => {
    dataInterface.getGroupDetail(groupId).then(res => {
      if (res.data.status === 1) {
        let robots = res.data.data.robotList || [];
        dataInterface.getRobotsStatus({clientRobots: robots})
        .then(res => {
          let result = res.data.result;
          robots.forEach((robot, index) => {
            result.forEach(item => {
              if (item.id === robot.id) {
                robots[index].status = 'online';
              }
            });
          });
          dispatch(updateViewGroupId(groupId));
          dispatch(getBindRobots(robots));
        });
      }
    });
  };
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
          group = Object.assign(group, res.data.data);
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
          dispatch(getAllGroups(res.data.data.data));
          dispatch(updateTotalItem(res.data.data.totalItem));
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
      console.log('open socket');
      console.log(`${location.protocol}//${location.hostname}:${location.port}`);
      window.socket = socket;
      dispatch(openSocket(socket));
    },
    viewRobot,
    addRobotRequest: params => {
      // 先上传头像
      dataInterface.uploadAvatar(params.avatar)
      .then(res => {
        console.log('上传头像');
        console.log(res);
        params.avatar = res;
        // params.avatar = res.url | res;
        let addParams = {
          wxId: params.wxId,
          wxAccount: params.wxAccount,
          name: params.name,
          avatar: params.avatar,
          qrcodeUrl: params.qrcodeUrl,
          addMemberReply: params.addMemberReply
        };
        dataInterface.addRobot(addParams).then(res => {
          if (res.data.status === 1) {
            params.robotId = res.data.data.id;
            // 这里发socket event, 告知node更新robotid
            params.socket.emit('update-bind', {
              robotId: params.robotId,
              groupId: params.bindGroupId,
              groupAvatar: params.currentGroup.avatar,
              memberMaxNum: params.currentGroup.memberMaxNum,
              groupQrcodeUrl: params.currentGroup.qrcodeUrl,
              invalidDate: params.currentGroup.invalidDate,
              groupName: params.groupName,
              addMemberReply: params.addMemberReply
            });
            return params;
          }
        }).then(params => {
          let bindParams = {
            robotId: params.robotId,
            groupId: params.bindGroupId,
            onedayMaxPullNum: params.onedayMaxPullNum,
            enabled: true,
            bind: true
          };
          dataInterface.bindRobot(bindParams).then(res => {
            if (res.data.status === 1) {
              viewRobot(bindParams.groupId);
            } else {
              message.error(res.data.details);
            }
          }).catch(e => {
            throw e;
          });
        });
      });
    }
  }
}

let GroupsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);

export default GroupsContainer;

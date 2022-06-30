import Robots from '../components/Robots.jsx';
import { connect } from 'react-redux';
import { message } from 'antd';
import {
  updateViewGroupId
} from '../actions/groups.js';
import {
  getBindRobots
} from '../actions/robots.js';
import * as dataInterface from '../interface.js';

const mapStateToProps = (state, ownProps) => {
  console.log('----robots----');
  console.log(state);
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (params) => {
      // params.avatar = res.url | res;
      let addParams = {
        wxId: params.wxId,
        wxAccount: params.wxAccount,
        name: params.name,
        avatar: params.avatar,
        qrcodeUrl: params.qrcodeUrl,
        bind: params.bind,
        addMemberReply: params.addMemberReply
      };
      dataInterface.addRobot(addParams).then(res => {
        if (res.data.status === 1) {
          params.robotId = res.data.data.id;
          return params;
        } else {
          message.error(res.data.details);
        }
      }).then(params => {
        let bindParams = {
          robotId: params.robotId,
          groupId: params.bindGroupId,
          onedayMaxPullNum: params.onedayMaxPullNum,
          enabled: true,
          bind: true
        };
        if (!params.bind) {
          bindParams.bind = false;
        }
        dataInterface.bindRobot(bindParams).then(res => {
          if (res.data.status === 1) {
            dataInterface.getGroupDetail(bindParams.groupId).then(res => {
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
                  dispatch(updateViewGroupId(params.bindGroupId));
                  dispatch(getBindRobots(robots));
                });
              }
            });
          } else {
            message.error(res.data.details);
          }
        }).catch(e => {
          throw e;
        });
      });
    },
    viewRobot: groupId => {
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
    }
  }
}

let RobotContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Robots);

export default RobotContainer;
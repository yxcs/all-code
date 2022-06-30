import types from '../types.js';

export const updateRobot = (robot) => {
  return {
    type: types.UPDATE_ROBOT,
    robot
  }
};

export const openSocket = (socket) => {
  return {
    type: types.OPEN_SOCKET,
    socket
  }
};

export const getBindRobots = (robots) => {
  return {
    type: types.GET_BIND_ROBOTS,
    robots
  }
};

export const bindRobot = (data) => {
  return {
    type: types.BIND_ROBOT,
    data
  }
};
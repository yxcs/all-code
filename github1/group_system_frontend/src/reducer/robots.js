import { fromJS } from 'immutable';
import types from '../types.js';

const robots = (state = [], action) => {
  switch (action.type) {
    case types.GET_ALL_ROBOTS:
      return action.robots;
    case types.UPDATE_ROBOT:
      state.some((robot, index, thisArr) => {
        if (robot.id === action.robot.id) {
          thisArr[index] = action.robot;
          return true;
        } else {
          return false;
        }
      });
      return fromJS(state);
    case types.GET_BIND_ROBOTS:
      return action.robots;
    default:
      return state;
  }
};

export default robots;
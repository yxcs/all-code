import types from '../types.js';
// import { fromJS } from 'immutable';

export const groups = (state = [], action) => {
  console.log('get action');
  console.log(state);
  console.log(action);
  switch (action.type) {
    case types.GET_ALL_GROUPS:
      console.log('get');
      console.log([...action.groups]);
      return [...action.groups];
    case types.REMOVE_GROUP:
      let targetIndex = -1;
      state.some((group, index, thisArr) => {
        if (group.groupId === action.groupId) {
          targetIndex = index;
          return true;
        } else {
          return false;
        }
      });
      state.splice(targetIndex, 1);
      return state;
    case types.UPDATE_GROUP:
      state.forEach((group, index, thisArr) => {
        if (group.id === action.group.id) {
          thisArr.splice(index, 1, action.group);
        }
      });
      return state;
    // case types.ADD_ROBOT:
    //   state.robots = action.robot;
    //   return state;
    case types.ADD_GROUP:
      console.log('data updated');
      console.log(state.concat(action.group));
      return state.concat(action.group);
    default:
      return state;
  }
};

export const totalItem = (state = 0, action) => {
  switch (action.type) {
    case types.UPDATE_TOTAL_ITEMS:
      return action.totalItem;
    default:
      return state;
  }
};

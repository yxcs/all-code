import types from '../types.js';

const groupId = (state = null, action) => {
  switch (action.type) {
    case types.UPDATE_VIEW_GROUP_ID:
      return action.groupId;
    default:
      return state;
  }
};

export default groupId;
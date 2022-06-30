import types from '../types.js';

export const addGroup = (group) => {
  return {
    type: types.ADD_GROUP,
    group
  };
};

export const updateGroup = (group) => {
  return {
    type: types.UPDATE_GROUP,
    group
  };
};

export const getAllGroups = (groups) => {
  return {
    type: types.GET_ALL_GROUPS,
    groups
  }
};

export const updateViewGroupId = (groupId) => {
  return {
    type: types.UPDATE_VIEW_GROUP_ID,
    groupId
  };
};

export const updateUuid = (uuid) => {
  return {
    type: types.UPDATE_UUID,
    uuid
  };
};

export const updateTotalItem = (totalItem) => {
  return {
    type: types.UPDATE_TOTAL_ITEMS,
    totalItem
  };
};
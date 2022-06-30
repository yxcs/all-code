import { combineReducers } from 'redux';
import { groups, totalItem } from './groups';
import robots from './robots';
import socket from './socket';
import groupId from './viewGroupId'

let appReducer = combineReducers({
  groups,
  robots,
  socket,
  totalItem,
  groupId
});

export default appReducer;
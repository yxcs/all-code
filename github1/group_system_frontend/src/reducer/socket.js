import types from '../types.js'

const socket = (state = null, action) => {
  switch (action.type) {
    case types.OPEN_SOCKET:
      return action.socket;
    default:
      return state
  }
};

export default socket;
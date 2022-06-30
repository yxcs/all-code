var extendObservable = require('../utils/libs/mobx.js').extendObservable;
var TodoStore = function () {
  extendObservable(this, {
    // observable data
    activeKey: 'CHOSEN'
  });

  // action
  this.addTodo = function (key) {
    this.activeKey = key;
  }

}

module.exports = {
  default: new TodoStore,
}
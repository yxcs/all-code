import ByCascadeTree from './src/cascadeTree';

/* istanbul ignore next */
ByCascadeTree.install = function(Vue) {
  Vue.component(ByCascadeTree.name, ByCascadeTree);
};

export default ByCascadeTree;

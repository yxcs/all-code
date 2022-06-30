import ByMagnifier from './src/magnifier';

/* istanbul ignore next */
ByMagnifier.install = function(Vue) {
  Vue.component(ByMagnifier.name, ByMagnifier);
};

export default ByMagnifier;
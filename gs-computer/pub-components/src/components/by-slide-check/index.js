import BySlideCheck from './src/slide-check';

/* istanbul ignore next */
BySlideCheck.install = function(Vue) {
  Vue.component(BySlideCheck.name, BySlideCheck);
};

export default BySlideCheck;
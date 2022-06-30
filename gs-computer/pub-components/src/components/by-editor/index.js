import ByEditor from './src/by-editor';

/* istanbul ignore next */
ByEditor.install = function(Vue) {
  Vue.component(ByEditor.name, ByEditor);
};

export default ByEditor;
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueDropUpload=t():e.VueDropUpload=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=18)}([function(e,t){e.exports=function(e,t,n,i,a,o){var s,c=e=e||{},r=typeof e.default;"object"!==r&&"function"!==r||(s=e,c=e.default);var l,u="function"==typeof c?c.options:c;if(t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),a&&(u._scopeId=a),o?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},u._ssrRegister=l):i&&(l=i),l){var d=u.functional,f=d?u.render:u.beforeCreate;d?(u._injectStyles=l,u.render=function(e,t){return l.call(t),f(e,t)}):u.beforeCreate=f?[].concat(f,l):[l]}return{esModule:s,exports:c,options:u}}},function(e,t,n){"use strict";var i=n(6);n.n(i);t.a={name:"ByButton",inject:{elForm:{default:""},elFormItem:{default:""}},props:{type:{type:String,default:"default"},size:String,icon:{type:String,default:""},nativeType:{type:String,default:"button"},loading:Boolean,disabled:Boolean,plain:Boolean,autofocus:Boolean,round:Boolean,circle:Boolean},computed:{_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},buttonSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size},buttonDisabled:function(){return this.disabled||(this.elForm||{}).disabled}},methods:{handleClick:function(e){this.$emit("click",e)}}}},function(e,t,n){"use strict";var i=n(10);n.n(i);t.a={name:"ByCheckbox",props:{value:{},label:{},indeterminate:Boolean,disabled:Boolean,checked:Boolean,name:String,trueLabel:[String,Number],falseLabel:[String,Number],id:String,controls:String,border:Boolean},computed:{model:{get:function(){return void 0!==this.value?this.value:this.selfModel},set:function(e){this.$emit("input",e),this.selfModel=e}},isChecked:function(){return"[object Boolean]"==={}.toString.call(this.model)?this.model:Array.isArray(this.model)?this.model.indexOf(this.label)>-1:null!==this.model&&void 0!==this.model?this.model===this.trueLabel:void 0}},data:function(){return{selfModel:!1,focus:!1}},methods:{handleChange:function(e){var t=void 0;t=e.target.checked?void 0===this.trueLabel||this.trueLabel:void 0!==this.falseLabel&&this.falseLabel,this.$emit("change",t,e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(5);i.a.install=function(e){e.component(i.a.name,i.a)},t.default=i.a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(8);i.a.install=function(e){e.component(i.a.name,i.a)},t.default=i.a},function(e,t,n){"use strict";var i=n(1),a=n(7),o=n(0)(i.a,a.a,!1,null,null,null);t.a=o.exports},function(e,t){},function(e,t,n){"use strict";var i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"by-button",class:[e.type?"by-button--"+e.type:"",e.buttonSize?"by-button--"+e.buttonSize:"",{"is-disabled":e.buttonDisabled,"is-loading":e.loading,"is-plain":e.plain,"is-round":e.round,"is-circle":e.circle}],attrs:{disabled:e.buttonDisabled||e.loading,autofocus:e.autofocus,type:e.nativeType},on:{click:e.handleClick}},[e.loading?n("i",{staticClass:"by-icon-loading"}):e._e(),e._v(" "),e.icon&&!e.loading?n("i",{class:e.icon}):e._e(),e._v(" "),e.$slots.default?n("span",[e._t("default")],2):e._e()])},staticRenderFns:[]};t.a=i},function(e,t,n){"use strict";var i=n(2),a=n(11);var o=function(e){n(9)},s=n(0)(i.a,a.a,!1,o,"data-v-7b2c07d9",null);t.a=s.exports},function(e,t){},function(e,t){},function(e,t,n){"use strict";var i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{staticClass:"by-checkbox"},[n("span",{staticClass:"by-checkbox__input",class:{"is-disabled":e.disabled,"is-checked":e.isChecked,"is-indeterminate":e.indeterminate,"is-focus":e.focus},attrs:{tabindex:!!e.indeterminate&&0,role:!!e.indeterminate&&"checkbox","aria-checked":!!e.indeterminate&&"mixed"}},[n("span",{staticClass:"by-checkbox__inner"}),e._v(" "),e.trueLabel||e.falseLabel?n("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],staticClass:"by-checkbox__original",attrs:{type:"checkbox","aria-hidden":e.indeterminate?"true":"false",name:e.name,disabled:e.disabled,"true-value":e.trueLabel,"false-value":e.falseLabel},domProps:{checked:Array.isArray(e.model)?e._i(e.model,null)>-1:e._q(e.model,e.trueLabel)},on:{change:[function(t){var n=e.model,i=t.target,a=i.checked?e.trueLabel:e.falseLabel;if(Array.isArray(n)){var o=e._i(n,null);i.checked?o<0&&(e.model=n.concat([null])):o>-1&&(e.model=n.slice(0,o).concat(n.slice(o+1)))}else e.model=a},e.handleChange],focus:function(t){e.focus=!0},blur:function(t){e.focus=!1}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],staticClass:"by-checkbox__original",attrs:{type:"checkbox","aria-hidden":e.indeterminate?"true":"false",disabled:e.disabled,name:e.name},domProps:{value:e.label,checked:Array.isArray(e.model)?e._i(e.model,e.label)>-1:e.model},on:{change:[function(t){var n=e.model,i=t.target,a=!!i.checked;if(Array.isArray(n)){var o=e.label,s=e._i(n,o);i.checked?s<0&&(e.model=n.concat([o])):s>-1&&(e.model=n.slice(0,s).concat(n.slice(s+1)))}else e.model=a},e.handleChange],focus:function(t){e.focus=!0},blur:function(t){e.focus=!1}}})]),e._v(" "),e.$slots.default||e.label?n("span",{staticClass:"by-checkbox__label"},[e._t("default"),e._v(" "),e.$slots.default?e._e():[e._v(e._s(e.label))]],2):e._e()])},staticRenderFns:[]};t.a=i},function(e,t,n){"use strict";var i=n(16),a=(n.n(i),n(4)),o=n(3);t.a={name:"ByCascadeTree",components:{"by-checkbox":a.default,"by-button":o.default},props:{value:{type:Array,required:!0},data:{type:Array,required:!0},column:{type:Number,default:3,validator:function(e){if(parseInt(e)!==e)throw new Error("[column] 必须为正整数");if(e<1)throw new Error("[column] 必须为正整数");return!0}},itemWidth:{type:Number,default:160,validator:function(e){if(e<=0)throw new Error("[column] 必须为正数");return!0}},width:{type:Number,default:500},popupMaxHeight:{type:Number,default:200},primaryKey:{type:String,default:"key"},childrenKey:{type:String,default:"children"},nameKey:{type:String,default:"name"},showNull:{type:Boolean,default:!0}},data:function(){return{activeKey:"",checkList:[]}},watch:{data:function(e){this.changeDataFormat(e)}},computed:{nameMaxWidth:function(){return this.itemWidth>85?this.itemWidth-85+"px":"80px"},componentWidth:function(){return this.itemWidth*this.column+"px"},popupWidth:function(){return this.itemWidth+60+"px"},subBoxWidth:function(){return this.itemWidth+20+"px"}},mounted:function(){document.addEventListener("click",this.bodyClick,!0),this.changeDataFormat(this.data)},methods:{changeDataFormat:function(e){var t=this,n=e.map(function(e){var n=e[t.childrenKey]instanceof Array?e[t.childrenKey]:[];return n=n.map(function(e){return{_key:e[t.primaryKey],_isCheck:!1,_name:e[t.nameKey]}}),{_key:e[t.primaryKey],_children:n,_name:e[t.nameKey],_isIndeterminate:!1,_isCheck:!1,_subLen:n.length,_subCheckLen:0}});this.showNull||(n=n.filter(function(e){return e._subLen})),this.checkList=n},showSecondSelection:function(e){this.activeKey=this.activeKey===e?"":e},superBoxChange:function(e,t){t._children=t._children.map(function(t){return t._isCheck=e,t}),t._isIndeterminate=!1,t._subCheckLen=e?t._subLen:0,this.setValueToParent()},subBoxChange:function(e,t){t._subCheckLen=e?t._subCheckLen+1:t._subCheckLen-1,t._isIndeterminate=!(!t._subCheckLen||t._subCheckLen===t._subLen),t._isCheck=t._subCheckLen===t._subLen,this.setValueToParent()},setValueToParent:function(){var e=[],t=this.showNull;this.checkList.forEach(function(n){t&&!n._subLen&&n._isCheck&&e.push(n._key),n._children.forEach(function(t){t._isCheck&&e.push(t._key)})}),this.$emit("input",e)},bodyClick:function(e){var t=this;this.$nextTick(function(){var n=t.$refs.cascadeTreePopup||[];n&&n.length&&-1===e.path.indexOf(n[0])&&(t.activeKey="")})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(14);i.a.install=function(e){e.component(i.a.name,i.a)},t.default=i.a},function(e,t,n){"use strict";var i=n(12),a=n(17);var o=function(e){n(15)},s=n(0)(i.a,a.a,!1,o,"data-v-0603965e",null);t.a=s.exports},function(e,t){},function(e,t){},function(e,t,n){"use strict";var i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"cascadeTree",staticClass:"cascade--tree__wrap",style:{width:e.componentWidth}},e._l(e.checkList,function(t){return n("div",{key:t._key,staticClass:"cascade--tree__item",style:{width:e.itemWidth+"px"}},[n("div",{class:["cascade--tree__operate",t._key===e.activeKey?"active":""]},[n("by-checkbox",{attrs:{label:t._key,indeterminate:t._isIndeterminate},on:{change:function(n){e.superBoxChange(n,t)}},model:{value:t._isCheck,callback:function(n){e.$set(t,"_isCheck",n)},expression:"item._isCheck"}},[n("span",{staticClass:"name",style:{"max-width":e.nameMaxWidth}},[e._v(e._s(t._name))])]),e._v(" "),t._subCheckLen?n("span",{staticClass:"num"},[e._v("("+e._s(t._subCheckLen)+")")]):e._e(),e._v(" "),t._subLen?[n("span",{staticClass:"arrow",on:{click:function(n){e.showSecondSelection(t._key)}}},[n("span",{class:["by-arrow-wrap",t._key===e.activeKey?"up":"down"]})]),e._v(" "),t._key===e.activeKey?n("div",{ref:"cascadeTreePopup",refInFor:!0,staticClass:"cascade--tree__popup",style:{width:e.popupWidth,"max-height":e.popupMaxHeight}},[n("div",{staticClass:"popup-content"},e._l(t._children,function(i){return n("div",{key:i._key},[n("by-checkbox",{attrs:{label:i._key},on:{change:function(n){e.subBoxChange(n,t)}},model:{value:i._isCheck,callback:function(t){e.$set(i,"_isCheck",t)},expression:"s._isCheck"}},[n("span",{staticClass:"sub-name",style:{"max-width":e.subBoxWidth}},[e._v(e._s(i._name))])])],1)})),e._v(" "),n("div",{staticClass:"popup-close"},[n("button",{staticClass:"by-button by-button--text",on:{click:function(t){e.showSecondSelection(e.activeKey)}}},[e._v("关闭")])])]):e._e()]:e._e()],2)])}))},staticRenderFns:[]};t.a=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),a=n(4),o=n(13);function s(e){e.component(i.default.name,i.default),e.component(a.default.name,a.default),e.component(o.default.name,o.default)}"undefined"!=typeof window&&window.Vue&&window.Vue.use(s),t.default={install:s,ByButton:i.default,ByCheckbox:a.default,ByCascadeTree:o.default}}])});
//# sourceMappingURL=index.js.map
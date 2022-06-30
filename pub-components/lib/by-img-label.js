!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueDropUpload=t():e.VueDropUpload=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=249)}({215:function(e,t,n){"use strict";var r=n(251),o=n.n(r),i=n(253),a=n.n(i),u=n(254);n.n(u);t.a={name:"ByImgLabel",props:{isShowSaveBtn:{type:Boolean,default:!0},src:{type:String,default:""},width:{type:[Number,String],default:500},theme:{type:String,default:"#409EFF"}},created:function(){this.pos={},this.dragstart={},!this.isShowSaveBtn&&this.menus.splice(1,1)},mounted:function(){var e=this;this.$nextTick(function(){e.menu=e.$refs.menu,e.img=e.$refs.img})},data:function(){return{isHideLabels:!0,menus:["新建标签","保存标签","清除标签","隐藏标签","导出为图片"],isShowMenu:!1,labels:JSON.parse(localStorage.getItem("__labels__"))||[]}},computed:{imgWidth:function(){return"number"==typeof this.width?this.width:this.width.slice(0,-2)}},methods:{ondragend:function(e,t){var n=this.img.getBoundingClientRect(),r=this.$refs["label-item"][t].clientWidth,o=this.$refs["label-item"][t].clientHeight;this.labels[t].left=Math.max(0,Math.min(e.clientX-n.left-this.dragstart.left,n.width-r-6)),this.labels[t].top=Math.max(6,Math.min(e.clientY-n.top-this.dragstart.top,n.height-o-10))},ondragstart:function(e,t){var n=this.img.getBoundingClientRect();this.dragstart.left=e.clientX-n.left-this.labels[t].left,this.dragstart.top=e.clientY-n.top-this.labels[t].top},onMenuClick:function(e){switch(e){case"新建标签":this.createdLabel();break;case"保存标签":this.saveLabel();break;case"清除标签":this.clearLabel();break;case"隐藏标签":case"显示标签":this.hideLabel();break;case"导出为图片":this.exportImg()}},handleRemoveLabel:function(e){this.labels.splice(e,1)},handleVoidClick:function(){this.hideMenu()},handleDivBlur:function(e,t){""===e.target.innerHTML&&this.labels.splice(t,1),e.target.setAttribute("contenteditable",!1),this.labels[t].text=e.target.innerText},handleDoubleClick:function(e){e.target.setAttribute("contenteditable",!0),e.target.focus(),this.$nextTick(function(){if(document.selection){var t=document.body.createTextRange();t.moveToElementText(e.target),t.select()}else if(window.getSelection){var n=document.createRange();n.selectNodeContents(e.target),window.getSelection().removeAllRanges(),window.getSelection().addRange(n)}})},createdLabel:function(){this.labels.push({left:this.pos.left,top:this.pos.top,text:"新建标签",_id:(new Date).getTime()})},saveLabel:function(){localStorage.setItem("__labels__",o()(this.labels))},clearLabel:function(){localStorage.removeItem("__labels__"),this.labels=[]},hideLabel:function(){this.isHideLabels=!this.isHideLabels,this.labels.length&&(this.menus[3]="显示标签"===this.menus[3]?"隐藏标签":"显示标签")},exportImg:function(){var e=this;setTimeout(function(){a.a.toJpeg(e.$refs.wrap).then(function(t){var n=document.createElement("a");n.href=t,n.download=e.getDate(),n.click()})})},handleContextmenu:function(e){var t=this,n=e.target.getBoundingClientRect();this.showMenu(),this.$nextTick(function(){var r=Math.min(e.clientX-n.left,t.img.offsetWidth-t.menu.offsetWidth),o=Math.min(e.clientY-n.top,t.img.offsetHeight-t.menu.offsetHeight);t.pos.left=r,t.pos.top=e.clientY-n.top+30+5>t.img.offsetWidth?e.clientY-n.top-30-5:e.clientY-n.top,t.menu.style.top=o+"px",t.menu.style.left=r+"px"})},showMenu:function(){this.isShowMenu=!0},hideMenu:function(){this.isShowMenu=!1},onMouseEnter:function(e){e.target.style.backgroundColor=this.theme,e.target.style.color="#fff"},onMouseLeave:function(e){e.target.style.backgroundColor="#fff",e.target.style.color="#000"},getDate:function(){var e=new Date;return"图片-"+e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())}}}},249:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(250);r.a.install=function(e){e.component(r.a.name,r.a)},t.default=r.a},250:function(e,t,n){"use strict";var r=n(215),o=n(255),i=n(7)(r.a,o.a,!1,null,null,null);t.a=i.exports},251:function(e,t,n){e.exports={default:n(252),__esModule:!0}},252:function(e,t,n){var r=n(3),o=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},253:function(e,t,n){!function(t){"use strict";var n=function(){return{escape:function(e){return e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")},parseExtension:t,mimeType:function(e){var n=t(e).toLowerCase();return(r="application/font-woff",{woff:r,woff2:r,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"})[n]||"";var r},dataAsUrl:function(e,t){return"data:"+t+";base64,"+e},isDataUrl:function(e){return-1!==e.search(/^(data:)/)},canvasToBlob:function(e){return e.toBlob?new Promise(function(t){e.toBlob(t)}):function(e){return new Promise(function(t){for(var n=window.atob(e.toDataURL().split(",")[1]),r=n.length,o=new Uint8Array(r),i=0;i<r;i++)o[i]=n.charCodeAt(i);t(new Blob([o],{type:"image/png"}))})}(e)},resolveUrl:function(e,t){var n=document.implementation.createHTMLDocument(),r=n.createElement("base");n.head.appendChild(r);var o=n.createElement("a");return n.body.appendChild(o),r.href=t,o.href=e,o.href},getAndEncode:function(e){var t=3e4;u.impl.options.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+(new Date).getTime());return new Promise(function(n){var r,o=new XMLHttpRequest;if(o.onreadystatechange=function(){if(4!==o.readyState)return;if(200!==o.status)return void(r?n(r):a("cannot fetch resource: "+e+", status: "+o.status));var t=new FileReader;t.onloadend=function(){var e=t.result.split(/,/)[1];n(e)},t.readAsDataURL(o.response)},o.ontimeout=function(){r?n(r):a("timeout of "+t+"ms occured while fetching resource: "+e)},o.responseType="blob",o.timeout=t,o.open("GET",e,!0),o.send(),u.impl.options.imagePlaceholder){var i=u.impl.options.imagePlaceholder.split(/,/);i&&i[1]&&(r=i[1])}function a(e){console.error(e),n("")}})},uid:(e=0,function(){return"u"+("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)+e++}),delay:function(e){return function(t){return new Promise(function(n){setTimeout(function(){n(t)},e)})}},asArray:function(e){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t},escapeXhtml:function(e){return e.replace(/#/g,"%23").replace(/\n/g,"%0A")},makeImage:function(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=n,r.src=e})},width:function(e){var t=n(e,"border-left-width"),r=n(e,"border-right-width");return e.scrollWidth+t+r},height:function(e){var t=n(e,"border-top-width"),r=n(e,"border-bottom-width");return e.scrollHeight+t+r}};var e;function t(e){var t=/\.([^\.\/]*?)$/g.exec(e);return t?t[1]:""}function n(e,t){var n=window.getComputedStyle(e).getPropertyValue(t);return parseFloat(n.replace("px",""))}}(),r=function(){var e=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:function(e,n,i){return t(e)?Promise.resolve(e).then(r).then(function(t){var r=Promise.resolve(e);return t.forEach(function(e){r=r.then(function(t){return o(t,e,n,i)})}),r}):Promise.resolve(e)},shouldProcess:t,impl:{readUrls:r,inline:o}};function t(t){return-1!==t.search(e)}function r(t){for(var r,o=[];null!==(r=e.exec(t));)o.push(r[1]);return o.filter(function(e){return!n.isDataUrl(e)})}function o(e,t,r,o){return Promise.resolve(t).then(function(e){return r?n.resolveUrl(e,r):e}).then(o||n.getAndEncode).then(function(e){return n.dataAsUrl(e,n.mimeType(t))}).then(function(r){return e.replace(function(e){return new RegExp("(url\\(['\"]?)("+n.escape(e)+")(['\"]?\\))","g")}(t),"$1"+r+"$3")})}}(),o=function(){return{resolveAll:function(){return e(document).then(function(e){return Promise.all(e.map(function(e){return e.resolve()}))}).then(function(e){return e.join("\n")})},impl:{readAll:e}};function e(){return Promise.resolve(n.asArray(document.styleSheets)).then(function(e){var t=[];return e.forEach(function(e){try{n.asArray(e.cssRules||[]).forEach(t.push.bind(t))}catch(t){console.log("Error while reading CSS rules from "+e.href,t.toString())}}),t}).then(function(e){return e.filter(function(e){return e.type===CSSRule.FONT_FACE_RULE}).filter(function(e){return r.shouldProcess(e.style.getPropertyValue("src"))})}).then(function(t){return t.map(e)});function e(e){return{resolve:function(){var t=(e.parentStyleSheet||{}).href;return r.inlineAll(e.cssText,t)},src:function(){return e.style.getPropertyValue("src")}}}}}(),i=function(){return{inlineAll:function t(o){if(!(o instanceof Element))return Promise.resolve(o);return function(e){var t=e.style.getPropertyValue("background");return t?r.inlineAll(t).then(function(t){e.style.setProperty("background",t,e.style.getPropertyPriority("background"))}).then(function(){return e}):Promise.resolve(e)}(o).then(function(){return o instanceof HTMLImageElement?e(o).inline():Promise.all(n.asArray(o.childNodes).map(function(e){return t(e)}))})},impl:{newImage:e}};function e(e){return{inline:function(t){return n.isDataUrl(e.src)?Promise.resolve():Promise.resolve(e.src).then(t||n.getAndEncode).then(function(t){return n.dataAsUrl(t,n.mimeType(e.src))}).then(function(t){return new Promise(function(n,r){e.onload=n,e.onerror=r,e.src=t})})}}}}(),a={imagePlaceholder:void 0,cacheBust:!1},u={toSvg:s,toPng:function(e,t){return c(e,t||{}).then(function(e){return e.toDataURL()})},toJpeg:function(e,t){return c(e,t=t||{}).then(function(e){return e.toDataURL("image/jpeg",t.quality||1)})},toBlob:function(e,t){return c(e,t||{}).then(n.canvasToBlob)},toPixelData:function(e,t){return c(e,t||{}).then(function(t){return t.getContext("2d").getImageData(0,0,n.width(e),n.height(e)).data})},impl:{fontFaces:o,images:i,util:n,inliner:r,options:{}}};function s(e,t){return function(e){void 0===e.imagePlaceholder?u.impl.options.imagePlaceholder=a.imagePlaceholder:u.impl.options.imagePlaceholder=e.imagePlaceholder;void 0===e.cacheBust?u.impl.options.cacheBust=a.cacheBust:u.impl.options.cacheBust=e.cacheBust}(t=t||{}),Promise.resolve(e).then(function(e){return function(e,t,r){if(!r&&t&&!t(e))return Promise.resolve();return Promise.resolve(e).then(function(e){return e instanceof HTMLCanvasElement?n.makeImage(e.toDataURL()):e.cloneNode(!1)}).then(function(r){return function(e,t,r){var o=e.childNodes;return 0===o.length?Promise.resolve(t):function(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return l(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}(t,n.asArray(o),r).then(function(){return t})}(e,r,t)}).then(function(t){return function(e,t){return t instanceof Element?Promise.resolve().then(function(){var r,o;r=window.getComputedStyle(e),o=t.style,r.cssText?o.cssText=r.cssText:function(e,t){n.asArray(e).forEach(function(n){t.setProperty(n,e.getPropertyValue(n),e.getPropertyPriority(n))})}(r,o)}).then(function(){[":before",":after"].forEach(function(r){!function(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(""!==i&&"none"!==i){var a=n.uid();t.className=t.className+" "+a;var u=document.createElement("style");u.appendChild(function(e,t,r){var o="."+e+":"+t,i=r.cssText?function(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}(r):function(e){return n.asArray(e).map(function(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}).join("; ")+";"}(r);return document.createTextNode(o+"{"+i+"}")}(a,r,o)),t.appendChild(u)}}(r)})}).then(function(){e instanceof HTMLTextAreaElement&&(t.innerHTML=e.value),e instanceof HTMLInputElement&&t.setAttribute("value",e.value)}).then(function(){t instanceof SVGElement&&(t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t instanceof SVGRectElement&&["width","height"].forEach(function(e){var n=t.getAttribute(e);n&&t.style.setProperty(e,n)}))}).then(function(){return t}):t}(e,t)})}(e,t.filter,!0)}).then(f).then(h).then(function(e){t.bgcolor&&(e.style.backgroundColor=t.bgcolor);t.width&&(e.style.width=t.width+"px");t.height&&(e.style.height=t.height+"px");t.style&&Object.keys(t.style).forEach(function(n){e.style[n]=t.style[n]});return e}).then(function(r){return function(e,t,r){return Promise.resolve(e).then(function(e){return e.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(e)}).then(n.escapeXhtml).then(function(e){return'<foreignObject x="0" y="0" width="100%" height="100%">'+e+"</foreignObject>"}).then(function(e){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+r+'">'+e+"</svg>"}).then(function(e){return"data:image/svg+xml;charset=utf-8,"+e})}(r,t.width||n.width(e),t.height||n.height(e))})}function c(e,t){return s(e,t).then(n.makeImage).then(n.delay(100)).then(function(r){var o=function(e){var r=document.createElement("canvas");if(r.width=t.width||n.width(e),r.height=t.height||n.height(e),t.bgcolor){var o=r.getContext("2d");o.fillStyle=t.bgcolor,o.fillRect(0,0,r.width,r.height)}return r}(e);return o.getContext("2d").drawImage(r,0,0),o})}function l(e,t,r){if(!r&&t&&!t(e))return Promise.resolve();return Promise.resolve(e).then(o).then(function(n){return i(e,n,t)}).then(function(t){return a(e,t)});function o(e){return e instanceof HTMLCanvasElement?n.makeImage(e.toDataURL()):e.cloneNode(!1)}function i(e,t,r){var o=e.childNodes;return 0===o.length?Promise.resolve(t):function(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return l(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}(t,n.asArray(o),r).then(function(){return t});function i(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return l(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}}function a(e,t){return t instanceof Element?Promise.resolve().then(function(){!function(e,t){e.cssText?t.cssText=e.cssText:function(e,t){n.asArray(e).forEach(function(n){t.setProperty(n,e.getPropertyValue(n),e.getPropertyPriority(n))})}(e,t)}(window.getComputedStyle(e),t.style)}).then(function(){[":before",":after"].forEach(function(r){!function(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(""===i||"none"===i)return;var a=n.uid();t.className=t.className+" "+a;var u=document.createElement("style");u.appendChild(function(e,t,r){var o="."+e+":"+t,i=r.cssText?function(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}(r):function(e){return n.asArray(e).map(function(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}).join("; ")+";"}(r);return document.createTextNode(o+"{"+i+"}")}(a,r,o)),t.appendChild(u)}(r)})}).then(function(){e instanceof HTMLTextAreaElement&&(t.innerHTML=e.value);e instanceof HTMLInputElement&&t.setAttribute("value",e.value)}).then(function(){if(!(t instanceof SVGElement))return;if(t.setAttribute("xmlns","http://www.w3.org/2000/svg"),!(t instanceof SVGRectElement))return;["width","height"].forEach(function(e){var n=t.getAttribute(e);n&&t.style.setProperty(e,n)})}).then(function(){return t}):t;function r(){function r(e,t){if(e.cssText)t.cssText=e.cssText;else r(e,t);function r(e,t){n.asArray(e).forEach(function(n){t.setProperty(n,e.getPropertyValue(n),e.getPropertyPriority(n))})}}r(window.getComputedStyle(e),t.style)}function o(){function r(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(i===""||i==="none")return;var a=n.uid();t.className=t.className+" "+a;var u=document.createElement("style");function s(e,t,r){var o="."+e+":"+t,i=r.cssText?a(r):u(r);return document.createTextNode(o+"{"+i+"}");function a(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}function u(e){return n.asArray(e).map(t).join("; ")+";";function t(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}}}u.appendChild(s(a,r,o)),t.appendChild(u)}[":before",":after"].forEach(function(e){r(e)})}function i(){if(e instanceof HTMLTextAreaElement)t.innerHTML=e.value;if(e instanceof HTMLInputElement)t.setAttribute("value",e.value)}function a(){if(!(t instanceof SVGElement))return;if(t.setAttribute("xmlns","http://www.w3.org/2000/svg"),!(t instanceof SVGRectElement))return;["width","height"].forEach(function(e){var n=t.getAttribute(e);if(!n)return;t.style.setProperty(e,n)})}}}function f(e){return o.resolveAll().then(function(t){var n=document.createElement("style");return e.appendChild(n),n.appendChild(document.createTextNode(t)),e})}function h(e){return i.inlineAll(e).then(function(){return e})}e.exports=u}()},254:function(e,t){},255:function(e,t,n){"use strict";var r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"wrap",staticClass:"img-label-wrap"},[n("img",{ref:"img",staticClass:"img",attrs:{src:e.src,width:e.imgWidth,draggable:!1},on:{click:e.handleVoidClick,contextmenu:function(t){return t.preventDefault(),e.handleContextmenu(t)}}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isHideLabels,expression:"isHideLabels"}],staticClass:"label-list"},e._l(e.labels,function(t,r){return n("div",{key:t._id,ref:"label-item",refInFor:!0,staticClass:"label-item",style:{left:t.left+"px",top:t.top+"px"},attrs:{draggable:!0},on:{contextmenu:function(e){e.preventDefault()},dblclick:e.handleDoubleClick,click:function(t){return e.handleRemoveLabel(r)},dragend:function(t){return e.ondragend(t,r)},dragstart:function(t){return e.ondragstart(t,r)}}},[n("span",{staticClass:"label-text",on:{click:function(e){e.stopPropagation()},blur:function(t){return e.handleDivBlur(t,r)}}},[e._v(e._s(t.text))])])}),0),e._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:e.isShowMenu,expression:"isShowMenu"}],ref:"menu",staticClass:"menu-list",on:{click:e.hideMenu}},e._l(e.menus,function(t,r){return n("li",{key:r,staticClass:"menu-item",on:{contextmenu:function(e){e.preventDefault()},mouseenter:e.onMouseEnter,mouseleave:e.onMouseLeave,click:function(n){return e.onMenuClick(t)}}},[e._v(e._s(t))])}),0)])},staticRenderFns:[]};t.a=r},3:function(e,t){var n=e.exports={version:"2.6.11"};"number"==typeof __e&&(__e=n)},7:function(e,t){e.exports=function(e,t,n,r,o,i){var a,u=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(a=e,u=e.default);var c,l="function"==typeof u?u.options:u;if(t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),o&&(l._scopeId=o),i?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},l._ssrRegister=c):r&&(c=r),c){var f=l.functional,h=f?l.render:l.beforeCreate;f?(l._injectStyles=c,l.render=function(e,t){return c.call(t),h(e,t)}):l.beforeCreate=h?[].concat(h,c):[c]}return{esModule:a,exports:u,options:l}}}})});
//# sourceMappingURL=by-img-label.js.map
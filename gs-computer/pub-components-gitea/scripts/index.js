// const fse = require('fs-extra');
const fs = require('fs');
const {resolve, join, extname} = require('path');
const VueParser = require('@vuese/parser')
const VueMR = require('@vuese/markdown-render')
const cheerio = require('cheerio')

const componentSrc = './src/components/by-cascade-tree';

const vueTransform2MD = (src) => {
  let name = src.split('\\');
  name = name[name.length - 1];
  name = name.replace('.vue', '');

  let component = fs.readFileSync(src, 'utf8')
  // const $ = cheerio.load(`<div id="coo">${component}</div>`, {decodeEntities: false});
  // const nodes = $('#coo')[0].children
  // const mdObj = {
  //   title: '',
  //   desc: '',
  //   demo: ''
  // }

  // for (let i = 0; i < nodes.length; i ++) {
  //   if (nodes[i].type === 'comment') {
  //     let txt = nodes[i].data
  //     if (txt.indexOf('__title:') > -1) {
  //       txt = txt.replace(/[\r\n]/gm, '')
  //       const startPos = txt.indexOf('__title:') + 8
  //       const endPos = txt.length - 1
  //       mdObj.title += `### ${txt.substring(startPos, endPos)}`
  //       mdObj.title = mdObj.title.trim()
  //     } else  if (txt.indexOf('__desc:') > -1) {
  //       const startPos = txt.indexOf('__desc:') + 8
  //       const endPos = txt.length - 1
  //       mdObj.desc += `${txt.substring(startPos, endPos)}\r\n`
  //       mdObj.desc = mdObj.desc.trim()
  //     } else if (txt.indexOf('__demo:') > -1) {
  //       txt = txt.replace(/[\r\n]/gm, '')
  //       const startPos = txt.indexOf('__demo:') + 8
  //       const endPos = txt.length - 1
  //       mdObj.demo += txt.substring(startPos, endPos)
  //       mdObj.demo = mdObj.demo.trim()
  //     }
  //   }
  // }
  // let mdStr = `${mdObj.title}\r\n\r\n${mdObj.desc}\r\n\r\n:::demo ${mdObj.demo}\r\n\r\n\`\`\`html
  // ${stripTemplate(component)}
  // <script>
  //   ${stripScript(component)}
  // </script>
  // <style lang="scss">
  //   ${stripStyle(component)}
  // </style>
  // \`\`\`\r\n\r\n:::\r\n`
  // fs.writeFileSync(
  //   './scripts/' + name + '.md',
  //   mdStr
  // )
  // if (name.indexOf('demo') > -1)  { .
  //   let mdArr = []
  //   var html = component.replaceAll(/(.*?)(<!--.*-->)(.*)\r\n/, function(str, left, center, right){
  //     mdArr.push(str)
  //     return '';
  //   });
  //   const mdObj = {
  //     title: '',
  //     desc: '',
  //     demo: ''
  //   }
  //   for (let i = 0; i < mdArr.length; i ++) {
  //     if (mdArr[i].indexOf('__title:') > -1) {
  //       const startPos = mdArr[i].indexOf('__title:') + 8
  //       const endPos = mdArr[i].indexOf('-->')
  //       mdObj.title = `### ${mdArr[i].substring(startPos, endPos)}`
  //       mdObj.title = mdObj.title.trim()
  //     } else if (mdArr[i].indexOf('__desc:') > -1) {
  //       const startPos = mdArr[i].indexOf('__desc:') + 7
  //       const endPos = mdArr[i].indexOf('-->')
  //       mdObj.desc = `\r\n ${mdArr[i].substring(startPos, endPos)}`
  //       mdObj.desc = mdObj.desc.trim()
  //     } else if (mdArr[i].indexOf('__demo:') > -1) {
  //       const startPos = mdArr[i].indexOf('__demo:') + 7
  //       const endPos = mdArr[i].indexOf('-->')
  //       mdObj.demo = mdArr[i].substring(startPos, endPos)
  //       mdObj.demo = mdObj.demo.trim()
  //     }
  //   }
  //   let mdStr = ''
  //   mdStr = `${mdObj.title}\r\n\r\n${mdObj.desc}\r\n\r\n:::demo ${mdObj.demo}\r\n\r\n\`\`\`html\r\n${html}\r\n\`\`\`\r\n\r\n:::\r\n`
  //   fs.writeFileSync(
  //     './scripts/' + name + '.md',
  //     mdStr
  //   )
  // } else {
    component = component.replace(/template\>/ig, 'div>')
    const parserRes = VueParser.parser(component)
    const r = new VueMR.Render(parserRes)
    const markdownRes = r.renderMarkdown()
    fs.writeFileSync(
      './scripts/' + name + '.md',
      markdownRes.content
    )
  // }
}

const dirs = fs.readdirSync(componentSrc);
String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
};
String.prototype.trim = function () {
　return this.replace(/(^\s*)|(\s*$)/g, "");
}
function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}
function stripTemplate(content) {
  const result = content.match(/<(template)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}
dirs.forEach(dir => {
  const absolute = resolve(componentSrc, dir);
  if (extname(absolute) !== '.vue') return
  vueTransform2MD(absolute)
});
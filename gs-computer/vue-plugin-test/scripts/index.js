// const fse = require('fs-extra');
const fs = require('fs');
const {resolve, join, extname} = require('path');
const VueParser = require('@vuese/parser')
const VueMR = require('@vuese/markdown-render')

const componentSrc = './src/components';

const vueTransform2MD = (src) => {
  let name = src.split('\\');
  name = name[name.length - 1];
  name = name.replace('.vue', '');

  let component = fs.readFileSync(src, 'utf8')
  if (name.indexOf('demo') > -1)  {
    let mdArr = []
    var html = component.replaceAll(/(.*?)(<!--.*-->)(.*)\r\n/, function(str, left, center, right){
      mdArr.push(str)
      return '';
    });
    const mdObj = {
      title: '',
      desc: '',
      demo: ''
    }
    for (let i = 0; i < mdArr.length; i ++) {
      if (mdArr[i].indexOf('__title:') > -1) {
        const startPos = mdArr[i].indexOf('__title:') + 8
        const endPos = mdArr[i].indexOf('-->')
        mdObj.title = `### ${mdArr[i].substring(startPos, endPos)}`
        mdObj.title = mdObj.title.trim()
      } else if (mdArr[i].indexOf('__desc:') > -1) {
        const startPos = mdArr[i].indexOf('__desc:') + 7
        const endPos = mdArr[i].indexOf('-->')
        mdObj.desc = `\r\n ${mdArr[i].substring(startPos, endPos)}`
        mdObj.desc = mdObj.desc.trim()
      } else if (mdArr[i].indexOf('__demo:') > -1) {
        const startPos = mdArr[i].indexOf('__demo:') + 7
        const endPos = mdArr[i].indexOf('-->')
        mdObj.demo = mdArr[i].substring(startPos, endPos)
        mdObj.demo = mdObj.demo.trim()
      }
    }
    let mdStr = ''
    mdStr = `${mdObj.title}\r\n\r\n${mdObj.desc}\r\n\r\n:::demo ${mdObj.demo}\r\n\r\n\`\`\`html\r\n${html}\r\n\`\`\`\r\n\r\n:::\r\n`
    fs.writeFileSync(
      './scripts/' + name + '.md',
      mdStr
    )
  } else {
    component = component.replace(/template\>/ig, 'div>')
    const parserRes = VueParser.parser(component)
    const r = new VueMR.Render(parserRes)
    const markdownRes = r.renderMarkdown()
    fs.writeFileSync(
      './scripts/' + name + '.md',
      markdownRes.content
    )
  }
}

const dirs = fs.readdirSync(componentSrc);
String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
};

String.prototype.trim = function () {
　return this.replace(/(^\s*)|(\s*$)/g, "");
}
dirs.forEach(dir => {
  const absolute = resolve(componentSrc, dir);
  if (extname(absolute) !== '.vue') return
  vueTransform2MD(absolute)
});
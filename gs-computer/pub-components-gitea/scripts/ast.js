var parser = require('@babel/parser');
var traverse = require('@babel/traverse');
var build = require('vue-template-compiler/build')
var {resolve, join, extname} = require('path');
const fs = require('fs');

var componentSrc = './src/components/by-cascade-tree/demo.vue';

var component = fs.readFileSync(componentSrc, 'utf8')

const sfc = build.parseComponent(component)

console.log(sfc.script.content)
var astTree = parser.parse(sfc.script.content, {
  sourceType: 'module'
})

console.log(astTree)

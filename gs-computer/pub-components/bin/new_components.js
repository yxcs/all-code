const fs = require('fs')
const path  = require('path')
const args = process.argv.slice(2)
let filename = args[0]
let type = args[1]

if (type === 'component') {
const wrapSrc = path.join(__dirname, `../src/components/by-${filename}`)
const comSrc = path.join(__dirname, `../src/components/by-${filename}/src`)
fs.mkdirSync(wrapSrc)
fs.mkdirSync(comSrc)
const filenameCase = filename.charAt(0).toUpperCase() + filename.slice(1)
fs.writeFileSync(`${wrapSrc}/index.js`, `
import By${filenameCase} from './src/${filename}';

/* istanbul ignore next */
By${filenameCase}.install = function(Vue) {
  Vue.component(By${filenameCase}.name, By${filenameCase});
};

export default By${filenameCase};
`)
fs.writeFileSync(`${comSrc}/${filename}.vue`, `
<template>
  <div class="${filename}">${filename} init</div>
</template>
<script>
import './${filename}.scss'
export default {
  name: 'By${filenameCase}',

  data () {
    retuen {}
  },

  props: {
  },

  computed: {
  },

  methods: {
  }
};
</script>
`)
fs.writeFileSync(`${comSrc}/${filename}.scss`, `
.${filename} {
  padding: 0;
  margin: 0;
}
`)
  console.log('构建完成')
} else if (type === 'directive') {
const directiveSrc = path.join(__dirname, `../src/directives/${filename}.js`)
fs.writeFileSync(directiveSrc, `
const ${filename} = {
  // insert、bind等
}

export default ${filename}
`)
console.log('构建完成')
} else if (type === 'filter') {
const filterSrc = path.join(__dirname, `../src/filters/${filename}.js`)
fs.writeFileSync(filterSrc, `
export default {
  ${filename} (val) {
    return val
  }
}
`)
console.log('构建完成')
} else {
console.log('神之类型，不予解析')
}
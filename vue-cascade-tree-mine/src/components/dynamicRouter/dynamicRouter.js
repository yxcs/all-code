const getAllFiles = (exclude = ['login', 'index', 'allRouters']) => {
  let files = require.context('./', false, /.(js)$/).keys()
  files = files.map(item => item.replace(/(\.\/)|(\.js)/ig, ''))
  files = files.filter(item => exclude.indexOf(item) === -1)
  return files
}

// 获取除了 ['login', 'index', 'allRouters'] 之外的所有的动态路由路径
const moduleList = getAllFiles(['login', 'index', 'allRouters'])

const getModules = (paths) => {
  const moduleArr = []
  for (let i = 0; i < paths.length; i++) {
    let current = require('./' + paths[i] + '.js').default
    moduleArr.push(current)
  }
  return moduleArr
}

// 获取路径对应的文件内容
const data = getModules(moduleList)

export default data

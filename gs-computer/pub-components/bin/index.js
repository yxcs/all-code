import program from 'commander' // 命令行监听
import execa from 'execa' // 调用其他外部指令
import chalk from 'chalk' // 颜色配置

// 暴露cli，接收用户输入命令
export function cli(args) {
  console.log(chalk.yellow('开始构建'))

  program
  .command('create <name>')
  .option('-t, --type <type>', '创建的组件类型[component*, directive, filter]')
  .description('创建指定组件')
  .action(async function (name, option) {
    if (!name) {
      console.log(chalk.red('请输入要创建的文件名称'))
    } else {
      if (!option.type || ['component', 'directive', 'filter'].indexOf(option.type) === -1) {
        option.type = 'component'
      }
      const { stdout } = await execa(`node ${__dirname}\\new_components.js ${name} ${option.type}`)
      console.log(stdout)
    }
  })

  program.parse(args)
}
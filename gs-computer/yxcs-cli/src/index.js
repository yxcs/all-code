import program from 'commander' // 命令行监听
import execa from 'execa' // 调用其他外部指令
import inquirer from 'inquirer' // 人机交互，输入命令等
import ora from 'ora' // 等待
import Listr from 'listr' // 步骤执行
import chalk from 'chalk' // 颜色配置
import boxen from 'boxen' // 加一个边框
import updateNotifier from 'update-notifier' // 版本更新检测
import pkg from '../package.json'

// pkg package.json
// bin 注册为命令
// publishConfig  scope 方式发布的配置
// npm link 本地添加指令

export function cli(args) {

  checkVersion() // 版本检测

  // console.log(chalk.yellow('I like yxcs'))

  console.log(boxen(chalk.yellow('I like yxcs'), { padding: 1 }))

  program.version(pkg.version, '-V, --version').usage('<command> [options]')

  program
  .command('start <food>')
  .option('-f, --fruit <name>', 'Fruit to be added')
  .description('Start cooking food')
  .action(function(food, option) {
    console.log(`run start command`);
    console.log(`argument: ${food}`);
    console.log(`option: fruit = ${option.fruit}`);
  })
  // execa
  program
  .command('npm-version')
  .description('Display npm version')
  .action(async function() {
    const { stdout } = await execa('npm -v');
    console.log('Npm version:', stdout);
  })
  // 问答
  program
    .command('ask')
    .description('Ask some questions')
    .action(async function(option) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your name?'
        },
        {
          type: 'confirm',
          name: 'isAdult',
          message: 'Are you over 18 years old?'
        },
        {
          type: 'checkbox',
          name: 'favoriteFrameworks',
          choices: ['Vue', 'React', 'Angular'],
          message: 'What are you favorite frameworks?'
        },
        {
          type: 'list',
          name: 'favoriteLanguage',
          choices: ['Chinese', 'English', 'Japanese'],
          message: 'What is you favorite language?'
        }
      ]);
      console.log('your answers:', answers);
    })
    // 等待 ora
    program
    .command('wait')
    .description('Wait 5 secords')
    .action(async function(option) {
      const spinner = ora('Waiting 5 seconds').start();
      let count = 5;

      await new Promise(resolve => {
        let interval = setInterval(() => {
          if (count <= 0) {
            clearInterval(interval);
            spinner.stop();
            resolve();
          } else {
            count--;
            spinner.text = `Waiting ${count} seconds`;
          }
        }, 1000);
      });
    })
    // 按照步骤执行 listr
    program
    .command('steps')
    .description('some steps')
    .action(async function(option) {
      const tasks = new Listr([
        {
          title: 'Run step 1',
          task: () =>
            new Promise(resolve => {
              setTimeout(() => resolve('1 Done'), 1000);
            })
        },
        {
          title: 'Run step 2',
          task: () =>
            new Promise((resolve) => {
              setTimeout(() => resolve('2 Done'), 1000);
            })
        },
        {
          title: 'Run step 3',
          task: () =>
            new Promise((resolve, reject) => {
              setTimeout(() => reject(new Error('Oh, my god')), 1000);
            })
        }
      ]);

      await tasks.run().catch(err => {
        console.error(err);
      });
    })

  program.parse(args)
}

function checkVersion() {
  const notifier = updateNotifier({ pkg, updateCheckInterval: 0 });

  if (notifier.update) {
    notifier.notify();
  }
}
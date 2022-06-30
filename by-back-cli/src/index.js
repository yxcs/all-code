var path = require('path')
// var fs = require('fs')
var program = require('commander') // 处理控制台命令
var chalk = require('chalk') // 五彩斑斓的控制台
// var semver = require('semver') // 版本检测提示
var fse = require('fs-extra') // 更友好的fs操作
var fs = require('fs')
var execa = require('execa') // 执行终端命令
var inquirer = require('inquirer') // 人机交互：输入、选择、确认框等
var ora = require('ora') // 人机交互：输入、选择、确认框等
var Listr = require('listr') // 执行步骤
var boxen = require('boxen') // 添加边框
var updateNotifier = require('update-notifier') // 版本更新检测
var CFonts = require('cfonts') // 性感的控制台字体
var download = require('download-git-repo') // git远程仓库拉取


var pkg = require('../package.json');

var currentPath = process.cwd();

function checkVersion () {
  const notifier = updateNotifier({ pkg, updateCheckInterval: 0 });

  if (notifier.update) {
    notifier.notify();
  }
}

function createBuild (target, branch) {
  var url = 'gitlab:192.168.99.68:support/mfs-base-demo'
  branch = branch || 'master'
  url = url + '#' + branch
  return new Promise(function (reslove, reject) {
    var spinner = ora('项目加载中...').start();
    download(url, target, { clone: true }, function (err) {
      if (err) {
        spinner.fail()
        reject(err);
      } else {
        spinner.succeed()
        reslove(target);
      }
    })
  })
}
async function buildProject (target, branch) {
  createBuild(target, branch).then(function (res) {
    console.log(chalk.white.bgRedBright('项目已保存至:', res))
  }).catch(function (err) {
    console.log(err)
  })
}

async function fetchProjectDemo (target) {
  var answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'demoSelected',
      default: 'demo/mfs',
      choices: [
        {
          name: '生产商商系统',
          value: 'demo/mfs'
        }, {
          name: '纯示例系统-开发中',
          value: 'demo/example'
        }
      ],
      message: '请选择创建的demo类型'
    }
  ]);
  if (!answer.demoSelected) {
    console.log(chalk.red.bgWhite('demo选择失败'));
    return false;
  }
  buildProject(target, answer.demoSelected);
}

async function buildBase (target) {
  console.log(boxen(chalk.yellowBright('开始选择创建项目，从头搭建，请认真选择!'), { padding: 0 }));
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isMock',
      message: '是否需要MOCK?'
    },
    {
      type: 'confirm',
      name: 'isLoginPage',
      message: '需要登陆页面吗?'
    },
    {
      when: function (res) { return Boolean(res.isLoginPage) },
      type: 'list',
      name: 'slideType',
      choices: [
        {
          name: '无需滑动验证',
          value: 'none'
        },
        {
          name: '数美:前后端验证',
          value: 'shumei'
        }, {
          name: 'by-ui:前端验证',
          value: 'ByUI'
        }
      ],
      default: 'shumei',
      message: '请选择滑动验证类型'
    },
    {
      type: 'input',
      name: 'projectPort',
      message: '请输入端口号',
      default: '8088'
    }
  ]);
  buildPage(target, answers)
}

async function buildPage (target, answers) {
  createBuild(target, 'create/base').then(function (res) {
    console.log(chalk.white.bgRedBright('项目已保存至:', res))
    buildAnswer(answers, res)
  }).catch(function (err) {
    console.log(err)
  })
}

async function buildAnswer (answers, dir) {
  if (answers.isMock) {
    var configPath = path.join(dir, './src/config.js')
    var serviceIndexPath = path.join(dir, './src/services/index.js')
    var servicesDemoPath = path.join(dir, './src/services/demo.js')
    var srcConfigPath = path.join(__dirname, './mock/config.js')
    var srcServiceIndexPath = path.join(__dirname, './mock/services/index.js')
    var srcServicesDemoPath = path.join(__dirname, './mock/services/demo.js')
    fse.removeSync(configPath)
    fse.removeSync(serviceIndexPath)
    fse.removeSync(servicesDemoPath)
    fse.copySync(srcConfigPath, configPath)
    fse.copySync(srcServiceIndexPath, serviceIndexPath)
    fse.copySync(srcServicesDemoPath, servicesDemoPath)
  }
  if (answers.isLoginPage) {
    var routerPath = path.join(dir, './src/router/index.js')
    var srcRouterPath = path.join(__dirname, './login/router/index.js')

    var serviceConfigPath = path.join(dir, './src/services/config/index.js')
    var srcServiceConfigPath = path.join(__dirname, './login/services/config/index.js')

    var loginPath = path.join(dir, './src/views/login.vue')
    var srcLoginPath = ''
    if (answers.slideType === 'shumei') {
      srcLoginPath= path.join(__dirname, './login/views/login_slide_shumei.vue')
    } else if (answers.slideType === 'ByUI') {
      srcLoginPath = path.join(__dirname, './login/views/login_slide_self.vue')
      var packagePath = path.join(dir, './package.json')
      var srcPackagePath = path.join(__dirname, './slideCheck/package.json')
      fse.copySync(srcPackagePath, packagePath)
      var slideImgPath = path.join(dir, './public/slide/')
      var srcSlideImgPath = path.join(__dirname, './slideCheck/public/slide')
      // if (!fse.pathExistsSync(slideImgPath)) {
      //   fse.mkdirSync(slideImgPath)
      // }
      fse.copySync(srcSlideImgPath, slideImgPath)
    } else {
      srcLoginPath = path.join(__dirname, './login/views/login.vue')
    }
    fse.copySync(srcRouterPath, routerPath)
    fse.copySync(srcServiceConfigPath, serviceConfigPath)
    fse.copySync(srcLoginPath, loginPath)
  }
  if (answers.projectPort !== 8088) {
    if (isNaN(parseInt(answers.projectPort))) {
      console.log(chalk.redBright('端口号有误，已设置为默认的8088'));
    } else {
      var protPath = path.join(__dirname, './port/vue.config.js')
      var destPortPath = path.join(dir, './vue.config.js')
      var buffer= fse.readFileSync(protPath)
      var portConfigObj = String(buffer)
      portConfigObj = portConfigObj.replace('8088', answers.projectPort)
      fse.removeSync(destPortPath)
      fse.outputFileSync(destPortPath, portConfigObj)
    }
  }
  installDependencies(dir)
}

async function installDependencies (dir) {
  process.chdir(dir)
  var spinner = ora('依赖安装中...').start();
  spinner.color = 'yellow';
  var count = 0;
  var timer = setInterval(function () {
    count ++;
    spinner.text = `依赖安装中...，已耗时 ${count}s`;
  }, 1000)
  try {
    var res = await execa('npm install');
    clearInterval(timer);
    timer = null;
    if (res.failed) {
      spinner.fail('依赖安装失败');
    } else {
      spinner.succeed(`依赖安装成功，耗时 ${count}s`);
    }
    console.log(res.stdout);
    console.log(boxen(chalk.yellowBright('项目构建完成'), { padding: 0 }));
    // process.abort();
  } catch (err) {
    console.log(err)
  }
}

export function cli(args) {
  // 方框和多彩文字背景输出
  console.log(boxen(chalk.yellowBright('Iove BiYao'), { padding: 1 }));

  // 性感的小文字
  CFonts.say('BiYao', {
    font: 'block',              // 字体
    align: 'left',              // 文字对齐
    colors: ['red'],            // 文字颜色
    background: 'transparent',  // 背景色,或者使用backgroundColor定义背景色，背景色为【transparent, black, red, green, yellow, blue, magenta, cyan, white, blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright】之一
    letterSpacing: 1,           // 字间距
    lineHeight: 1,              // 行高
    space: true,                // 是否上下空格
    maxLength: '0',             // 一行最多多少字，0不限制
  });
  // 开启版本检测
  checkVersion();

  program.version(pkg.version, '-V, --version').usage('<command> [options]'); // 输出本CLI版本

  program
    .command('create <filename>')
    .option('-B, --build <type>', '创建项目，base：基础版，normal：进阶版，senior：高级版，demo：生成现有项目dmeo，select：从头选择创建，默认为select')
    .description('创建项目，可根据传参直接创建，若不传参则进入系统选择')
    .action(async function (filename, options) {
      var target = path.join(currentPath, './' + filename);
      // 判断文件是否已存在
      if (fse.pathExistsSync(target)) {
        var answer = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'isReWrite',
            message: '文件已存在是否覆盖？'
          }
        ]);
        if (answer.isReWrite) {
          // 删除已有文件
          var spinner = ora('文件删除中...').start();
          spinner.color = 'yellow';
          fse.removeSync(target);
          spinner.succeed('文件删除完成');
        } else {
          console.log(chalk.red.bgWhite('项目创建已停止'));
          return false
        }
      }
      options.build = options.build || 'select'
      switch (options.build) {
        case 'base':
          console.log('开始创建基础版项目');
          buildProject(target, 'build/base');
          break;
        case 'normal':
          console.log('开始创建通用版项目');
          buildProject(target, 'build/normal');
          break;
        case 'senior':
          console.log('开始创建高级版项目');
          buildProject(target, 'build/senior');
          break;
        case 'demo':
          console.log('开始创建现有项目DEMO');
          fetchProjectDemo(target);
          break;
        default:
          buildBase(target);
          break;
      }
    })

  program
    .command('npm-version')
    .description('查看NPM版本号')
    .action(async function() {
      const { stdout } = await execa('npm -v');
      console.log('Npm Version:', stdout);
    });

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
    });

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
    });

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
    });

  program.parse(args); // 参数注入
}

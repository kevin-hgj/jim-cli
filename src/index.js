const { Command } = require('commander');
const program = new Command();
const _ = require('lodash')
const chalk = require('chalk');
const log = console.log;

const download = require('download-git-repo')
const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule();
const ora = require('ora')
const symbols = require('log-symbols')
const startZip = require('./zip')

program
    .version(require('../package.json').version, '-v, --version')
    .command('zip')
    .alias('Z')
    .description('初始化压缩文件设置')
    .option('--name [moduleName]')
    .action( option => {

        const customModeConfig = _.assign({
            directory: null,
            zipName: ''
        }, option)

        const promps = []
        if(customModeConfig.directory !== 'string') {
            promps.push({
                type: 'input',
                name: 'directory',
                message: '请输入自定义的压缩文件目录:',
                validate: input => {
                    if(!input) {
                        return '不能为空'
                    }
                    return true
                }
            })
        }
        if(customModeConfig.zipName !== 'string') {
            promps.push({
                type: 'input',
                name: 'zipName',
                message: '请输入自定义ZIP名：'
            })
        }
        
        const initPromp =  {
            type: 'list',
            message: '请选择默认打包模式还是自定义打包模式（默认打包模式为自动打包build目录）',
            name: 'buildMode',
            choices: [
                { name: '默认模式', value: 'default' },
                { name: '自定义模式', value: 'custom' },
                ],
        }
        
        prompt(initPromp).then((answers) => {
            // 默认模式
            if(answers.buildMode === 'default') {
                const proce = ora(`正在进行ZIP dist 目录...`)
                proce.start()
                try {
                    startZip()                    
                    proce.succeed()
                    console.log(chalk.green('zip success !'))
                } catch (e) {
                    proce.fail()
                    console.log(chalk.red('zip fail !'))
                }
            } else {
                inquirer.prompt(promps).then(answers => {
                    const config = {
                        pathStr: answers.directory,
                        zipName: answers.zipName
                    }
                    const proce = ora(`正在进行ZIP ${answers.directory} 目录...`)
                    proce.start()
                    try {
                        startZip(config)                    
                        proce.succeed()
                        console.log(chalk.green('zip success !'))
                    } catch (e) {
                        proce.fail()
                        console.log(chalk.red('zip fail !'))
                    }
                })
            }
            // const distPath = answers.directory
           
           
        })
    })

       
   
  
    // }).on('--help', function() {
    //     console.log('  Examples:')
    //     console.log('')
    //     console.log('$ app module moduleName')
    //     console.log('$ app m moduleName')
    // })
    
program.parse(process.argv)

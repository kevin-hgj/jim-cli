'use strict'
const _ = require('lodash')
const chalk = require('chalk')
const log = console.log

const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()
const ora = require('ora')
const {startZip } = require('./utils/index')

const zip = () => {
  const customModeConfig = _.assign({
    directory: null,
    zipName: ''
  })

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
    message: '请选择默认打包模式还是自定义打包模式（默认打包模式为自动打包dist目录）',
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
        log(chalk.green('zip success !'))
      } catch (e) {
        proce.fail()
        log(chalk.red('zip fail !'))
      }
    } else {
      // 自定义模式
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
          log(chalk.green('zip success !'))
        } catch (e) {
          proce.fail()
          log(chalk.red('zip fail !'))
        }
      })
    }
           
  })
    

}
module.exports = zip

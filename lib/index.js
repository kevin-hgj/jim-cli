'use strict'

const { program } = require("commander")
const create = require("./create")
const zip = require("./zip")

const actionMap = {
  // 创建
  create: {
    description: '创建一个新项目',
    usages: [
      'jim-cli create projectName',
      'jim create projectName'
    ],
    alias: 'c'
  },
  // 初始化
  // init: {
  //     description: '初始化项目',
  //     usages: [
  //         'jim-cli init',
  //         'jim init' 
  //     ],
  //     alias: 'i'
  // },
  // 生成zip
  zip: {
    description: '初始化压缩文件设置',
    usages: [
      'jim-cli zip',
      'jim zip'
    ],
    alias: 'z',
  }
}

Object.keys(actionMap).map(action => {
  if(actionMap[action].options) {
    Object.keys(actionMap[action].options).map( option => {
      const obj = actionMap[action].options[option]
      program.option[obj.flags, obj.description, obj.defaultValue]
    })
  }

  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action( () => {
      switch(action) {
        case 'create':
          create(...process.argv.slice(3))
          break
                
          // case 'init':
          // init(...processgit .argv.slice(3))
          //     break
        case 'zip':
          zip()
          break
        default: 
          break
      }   
    })
})

// 项目版本
program
  .version(require('../package.json').version, '-v --version')
  .parse(process.argv)

// 命令不带参数的时候，输出帮助信息
if(!process.argv.slice(2).length) {
  program.outputHelp()
}
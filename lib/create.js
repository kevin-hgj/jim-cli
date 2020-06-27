'use strict'

const { chalk } = require('chalk')
const log = console.log
const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()
const ora = require('ora')
const symbols = require('log-symbols')

const { downloadTemplate, notExistFold, updateTemplateJson} = require('./utils/index')


const initPromp = [
  {
    type: 'list',
    message: '请选择PC模板还是H5模板（默认为PC模板）：',
    name: 'projectMode',
    choices: [
      { name: 'PC模板（默认模板）', value: 'PC' },
      { name: 'H5模板', value: 'H5' },
    ],
  },
  {
    type: 'list',
    name: 'mpaOrSpa',
    message: '请选择页面模板：',
    choices: [
      { name: 'SPA（单页面）', value: 'spa'},
      { name: 'MPA（多页面）', value: 'mpa'},
    ]
  },
  {
    type: 'list',
    name: 'frame',
    message: '请选择框架模板：',
    choices: [
      { name: 'Vue.js', value: 'vue.js'},
      { name: 'React.js', value: 'react.js'},
    ]
  },
  {
    type: 'list',
    name: 'typescript',
    message: '是否使用TypeScript：',
    choices: [
      { name: '是', value: 'yes'},
      { name: '否', value: 'no' }
    ]
  }
]

/**
 * 创建一个项目
 * @param {String} projectName 
 */
const create = (projectName) => {

  if(projectName === undefined) {
    log(symbols.error, chalk.red('请输入项目名'))
  } else {
    notExistFold(projectName).then(() => {
      prompt(initPromp).then((answers) => {
        const { mpaOrSpa, frame, typescript, projectMode } = answers
        // pc模板
        if(projectMode === 'PC') {
          const proce = ora(`${projectMode}模板下载中...`)
          proce.start()
                    
          const url = 'direct:https://github.com/kevin-hgj/webpack-generate.git'
          const downloadParam = {
            projectName,
            typescript,
            mpaOrSpa,
            frame
          }
          downloadTemplate(downloadParam, url).then(() => {
            proce.succeed(`${projectMode}模板下载完成`)
            const fileName = `${projectName}/package.json`
            answers.name = projectName
            updateTemplateJson(fileName, answers).then(() => {
              log(symbols.success, chalk.green(`${projectName} package.json rename success`))
            })
          }).catch(() => {
            proce.fail(`${projectMode}模板下载失败`)
          })
        } else {
          const proce = ora(`${projectMode}模板下载中...`)
          proce.start()
                    
          let url = ''
          switch(frame) {
            case 'vue.js':
              url = 'direct:https://github.com/kevin-hgj/webpack-generate.git'
              break
            case 'react.js':
              url = 'direct:https://github.com/kevin-hgj/webpack-generate.git'
              break
            default:
              url = 'direct:https://github.com/kevin-hgj/webpack-generate.git'
              break
          }
          const downloadParam = {
            projectName,
            typescript,
            mpaOrSpa,
            frame
          }
          downloadTemplate(downloadParam, url).then(() => {
            proce.succeed(`${projectMode}模板下载完成`)
            const fileName = `${projectName}/package.json`
            answers.name = projectName
            updateTemplateJson(fileName, answers).then(() => {
              log(symbols.success, chalk.green(`${projectName} package.json rename success`))
            })
          }).catch(() => {
            proce.fail(`${projectMode}模板下载失败`)
          })
                
        }
               
      })
    }).catch(() => {})
  }

}

module.exports = create

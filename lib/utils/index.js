'use strict'

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const downloadFromGit = require('download-git-repo')
const archiver = require('archiver')
const projectDir = process.cwd()
 
/**
 * 检查目录是否存在
 * @param {String} dir 
 * @param {String} name 
 */
const notExistFold = (dirName) => {
  return new Promise((resolve, reject) => {
    const isExist = fs.existsSync(dirName)
    if(isExist) {
      console.log(chalk.red(`项目名 ${dirName} 已存在此目录，请使用其他项目名！`))
      reject('error')
    } else {
      resolve()
    }
  })
}
/**
 *  从git仓库拉取项目模板
 * @param {Object} option 
 * @param {String} api 
 */
const downloadTemplate = (option, url) => {
  const { projectName, frame, typescript, mpaOrSpa } = option
  return new Promise((resolve, reject) => {
    downloadFromGit(url, projectName, { clone: true }, (err) => {
      if(err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}


/**
 * 更新模板对应的json
 * @param {String} fileName 
 * @param {Object} obj 
 */
const updateTemplateJson = (fileName, obj) => {
  return new Promise(resolve => {
    if(fs.existsSync(fileName)){
      const data = fs.readFileSync(fileName).toString()
      const json = JSON.parse(data)
      Object.keys(obj).forEach(key => {
        json[key] = obj[key]
      })
      fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8')
      resolve()
    }
  })
}

/**
 * 版本号生产
 */
const versionSuffix = (date) => {
  date = date || new Date()
  return `${date.getFullYear()}${prefix(date.getMonth() + 1)}${prefix(date.getDate())}(${Math.ceil(Math.random() * 1000000)})`
  function prefix(num) {
    if(num < 10) {
      return '0' + num
    }
    return num
  }

}

/**
 * 开始进行压缩
 * @param {Object} config 
 */
const startZip = (config = {}) => {
  const pathStr = config.pathStr || 'dist'
  const zipName = config.zipName || 'dist'
  const distPath = path.resolve(pathStr)
  console.log(chalk.blue('压缩ZIP包中'))
  const archive = archiver('zip', {
    zlib:  { lever: 9 }
  }).on('error', err => {
    throw err
  })

  const ouput = fs.createWriteStream(`${projectDir}/${zipName}_${versionSuffix()}.zip`).on('close', err=> {
    if(err) {
      console.log(chalk.red(' 关闭archiver异常：', err))
      return 
    }
    console.log(chalk.blue(`ZIP SUCCESS!: ${projectDir}/${zipName}_${versionSuffix()}.zip`))
  })

  archive.pipe(ouput)
  archive.directory(distPath, '/')
  archive.finalize()
}

module.exports = {
  notExistFold,
  downloadTemplate,
  updateTemplateJson,
  startZip
}
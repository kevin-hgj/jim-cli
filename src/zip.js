const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const projectDir = process.cwd();
const chalk = require('chalk');

const versionSuffix = () => {
    const date = new Date()
    return `${date.getFullYear()}${prefix(date.getMonth() + 1)}${prefix(date.getDate())}(${Math.ceil(Math.random() * 1000000)})`
    function prefix(num) {
        if(num < 10) {
            return '0' + num;
        }
        return num
    }

}
const startZip = (config = {}) => {
    pathStr = config.pathStr || 'dist'
    const zipName = config.zipName || 'dist'
    distPath = path.resolve(pathStr)
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
    archive.finalize();
}

module.exports = startZip


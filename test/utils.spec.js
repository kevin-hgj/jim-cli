const {
  notExistFold,
  downloadTemplate,
  updateTemplateJson,
  startZip 
} = require('../src/utils/index')
const fs = require('fs')
const rimraf = require('rimraf') 


const data= {
  projectName: 'ht-test',
  frame: 'vue.js',
  typescript: 'yes',
  mpaOrSpa:'mpa'
}
const configTest = {
  pathStr: './utils.spec.js',
  zipName: 'test.utils'
}
const url = 'direct:https://github.com/kevin-hgj/webpack-generate.git'

afterAll(() => {
  cleanTestDir()
})
beforeAll(() => {
  cleanTestDir()
})
function cleanTestDir() {
  if(fs.existsSync(data.projectName)) {
    rimraf(data.projectName, err => {
      if(err) {
        console.log('rimraf', err)
      }
    })
  }
   
}

  
test('notExistFold test', async () => {
  try {
    const res = await notExistFold(data.projectName)
  } catch (e) {
    expect(e).toMatch('error')
  }
}) 

test('downloadTemplate function test', async() => {
  expect.assertions(1)
  const res = await downloadTemplate(data, url)
  expect(res).toBe(undefined)
})

test('updateTemplateJson function test', async() => {
  const res = await updateTemplateJson(`${data.projectName}/package.json`, { name:data.projectName })
  expect(res).toBe(undefined)
})

test('startZip function test', () => {
  
})
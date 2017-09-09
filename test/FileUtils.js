const fs = require('fs')
const assert = require('assert')
const path = require('path')
const {FilesUtils} = require('../src/FilesUtils.js')

const appDir = path.join(__dirname, '..')
const tempFolder = './test/temp/'

describe('FilesUtils', function() {
  describe('#mkdirpSync', function() {
    it('should create folder reccursively', function() {
      const folderPath = path.join(tempFolder, 'testDir')
      const subFolderPath = path.join(folderPath, 'other')
      const folder2Path = path.join(tempFolder, 'testDir2')
      FilesUtils.mkdirpSync(path.join(appDir, folderPath))
      FilesUtils.mkdirpSync(path.join(appDir, folder2Path))
      FilesUtils.mkdirpSync(path.join(appDir, subFolderPath))
      FilesUtils.mkdirpSync(path.join(appDir, subFolderPath)) // try twice

      assert(fs.existsSync(folderPath))
      assert(fs.existsSync(subFolderPath))
      assert(fs.existsSync(path.join(tempFolder, 'testDir')))
    })
  })

  describe('#mkdirpSync', function() {
    it('should delete folder reccursively', function() {
      const subFolderPath = path.join(tempFolder, 'testDir', 'other')
      FilesUtils.mkdirpSync(path.join(appDir, subFolderPath))
      fs.writeFileSync(path.join(subFolderPath, 'truc.mkv'), 'test')
      assert(fs.existsSync(subFolderPath)) // sanity check

      FilesUtils.rmdirSync(tempFolder)
      assert(!fs.existsSync(tempFolder))
    })
  })

  afterEach(() =>
    !fs.existsSync(tempFolder) || FilesUtils.rmdirSync(tempFolder)
  )
})

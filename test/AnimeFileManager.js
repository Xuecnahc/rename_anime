const proxyquire = require('proxyquire')
const assert = require('assert')
const sinon = require('sinon')
const path = require('path')
const fs = require('fs')

const testConfig = require('./configs/anime-test.json')
const {FilesUtils} = require('../src/FilesUtils.js')

const readLineStub = {question: sinon.stub().returns(3)};
const {AnimeFileManager} = proxyquire(
  '../src/AnimeFileManager.js', {'readline-sync': readLineStub}
)

describe('AnimeFileManager', function() {
  const tempFolder = './test/temp/'
  const folderPath = path.join(tempFolder, 'testDir')
  const folder2Path = path.join(tempFolder, 'testDir2')
  const subFolderPath = path.join(folderPath, 'other')
  beforeEach(() => {
    FilesUtils.mkdirpSync(folderPath)
    FilesUtils.mkdirpSync(folder2Path)
    FilesUtils.mkdirpSync(subFolderPath)
    fs.writeFileSync(path.join(folderPath, 'truc.mkv'), 'test')
    fs.writeFileSync(path.join(folderPath, 'truc 02.mkv'), 'test')
    fs.writeFileSync(path.join(folderPath, 'other 01.mkv'), 'subFolderPath')
    fs.writeFileSync(path.join(subFolderPath, 'other 01.mkv'), 'subFolderPath')
    fs.writeFileSync(path.join(subFolderPath, 'other 02.avi'), 'subFolderPath')
  })

  afterEach(() =>
    !fs.existsSync(tempFolder) || FilesUtils.rmdirSync(tempFolder)
  )

  describe('#renameAll', function() {
    it('should rename all anime in a folder according to folder name', function() {
      const animeFileRenamer = new AnimeFileManager(testConfig)
      animeFileRenamer.renameAll()

      assert(fs.existsSync(path.join(folderPath, 'testDir - 01.mkv')))
      assert(fs.existsSync(path.join(folderPath, 'testDir - 02.mkv')))
      assert(fs.existsSync(path.join(folderPath, 'testDir - 03.mkv')))
      assert(fs.existsSync(path.join(subFolderPath, 'other - 02.avi')))
    });
  });
});

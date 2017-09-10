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
  })

  afterEach(() =>
    !fs.existsSync(tempFolder) || FilesUtils.rmdirSync(tempFolder)
  )

  describe('#renameAll', function() {
    it('should rename all anime in a folder according to folder name', function() {
      const testMaps = [ // [default file, renamed file]
        [path.join(tempFolder, 'truc.mkv'), path.join(tempFolder, 'truc - 00.mkv')],
        [path.join(tempFolder, 'other 01.mkv'), path.join(tempFolder, 'other - 01.mkv')],
        [path.join(folderPath, 'other 01.mkv'), path.join(folderPath, 'testDir - 01.mkv')],
        [path.join(folderPath, 'truc 02.mkv'), path.join(folderPath, 'testDir - 02.mkv')],
        [path.join(folderPath, 'testDir - 06.mkv'), path.join(folderPath, 'testDir - 06.mkv')],
        [path.join(folderPath, 'truc.mkv'), path.join(folderPath, 'testDir - 03.mkv')],
        [path.join(subFolderPath, 'other 01.mkv'), path.join(subFolderPath, 'other - 01.mkv')],
        [path.join(subFolderPath, 'blop 02.avi'), path.join(subFolderPath, 'other - 02.avi')],
        [path.join(subFolderPath, 'blop 03.avi'), path.join(subFolderPath, 'blop 03.avi')],
        [path.join(subFolderPath, 'blop 03.avi.part'), path.join(subFolderPath, 'blop 03.avi.part')]
      ]

      const animeFileManager = new AnimeFileManager(testConfig)
      testMaps.forEach(test => { fs.writeFileSync(test[0], 'test') })
      animeFileManager.renameAll()
      testMaps.forEach(test => {
        assert(fs.existsSync(test[1]))
        if (test[0] !== test[1]) { // if the file name changed the old file should have been deleted
          assert(!fs.existsSync(test[0]))
        }
      })
    });
  });

  describe('#organizeRootAnimeInFolder', function() {
    it('should organise all root anime with more than one occurence in folder', function() {
      const testMaps = [ // [default file, moved file]
        [path.join(tempFolder, 'Blop no ken - 01.mkv'), path.join(tempFolder, 'Blop no ken', 'Blop no ken - 01.mkv')],
        [path.join(tempFolder, 'Blop no ken - 02.mkv'), path.join(tempFolder, 'Blop no ken', 'Blop no ken - 02.mkv')],
        [path.join(tempFolder, 'Blop no ken - 03.mkv'), path.join(tempFolder, 'Blop no ken', 'Blop no ken - 03.mkv')],
        [path.join(tempFolder, 'Blip paradise - 01.mkv'), path.join(tempFolder, 'Blip paradise - 01.mkv')]
      ]

      const animeFileManager = new AnimeFileManager(testConfig)
      testMaps.forEach(test => { fs.writeFileSync(test[0], 'test') })
      animeFileManager.organizeRootAnimeInFolder()
      testMaps.forEach(test => {
        assert(fs.existsSync(test[1]))
        if (test[0] !== test[1]) { // if the file name changed the old file should have been deleted
          assert(!fs.existsSync(test[0]))
        }
      })
    });
  });
});

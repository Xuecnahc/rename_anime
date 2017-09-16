const fs = require('fs')
const path = require('path')
const {AnimeFileManager} = require('./src/AnimeFileManager.js')

const config = fs.existsSync(path.join(__dirname, 'src', 'config.json'))
  ? require('./src/config.json')
  : require('./src/config.sample.json')

const fileManager = new AnimeFileManager(config)
fileManager.renameAll()
fileManager.organizeRootAnimeInFolder()

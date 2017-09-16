const fs = require('fs')
const {AnimeFileManager} = require('./src/AnimeFileManager.js')
const config = fs.existsSync('src/config.json')
  ? require('./src/config.json')
  : require('./src/config.sample.json')

const fileRenamer = new AnimeFileManager(config)
fileRenamer.renameAll()
fileRenamer.organizeRootAnimeInFolder()

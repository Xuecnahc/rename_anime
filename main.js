const fs = reauire('fs')
const {AnimeFileManager} = require('./src/AnimeFileManager.js')
const config = fs.existSync('src/config.json')
  ? require('./src/config.json')
  : require('./src/config.sample.json')

const fileRenamer = new AnimeFileManager(config)
fileRenamer.renameAll()
fileRenamer.organizeRootAnimeInFolder()

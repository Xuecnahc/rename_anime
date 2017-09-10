const config = require('./src/config.json')
const {AnimeFileManager} = require('./src/AnimeFileManager.js')

const fileRenamer = new AnimeFileManager(config)
fileRenamer.renameAll()
fileRenamer.organizeRootAnimeInFolder()

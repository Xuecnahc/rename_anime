const fs = require('fs')

const config = require('./src/config.json')
const {AnimeFileRenamer} = require('./src/AnimeFileRenamer.js')

const fileRenamer = new AnimeFileRenamer(config)
fileRenamer.renameAll()

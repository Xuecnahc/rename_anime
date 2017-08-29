const fs = require('fs')
const config = require('./config.json')
const {Anime} = require('./Anime.js')

function logError(error) {
  console.error(error)
  fs.writeFile('./logs/log.txt', error, function(logWritingError) {
      if (logWritingError) {
          return console.error(logWritingError)
      }
  })
}

/**
 * @param {Map} dir
 * @param {String} dir.path
 * @param {Map} [dir.reccursion]
 * @param {Boolean} [dir.reccursion.use_dir_name=false]
 * @param {String[]} [dir.reccursion.excluded_folders=[]]
 * @param {String} [folderName]
 */
function renameFiles(dir, folderName) {
  const excludedFolder = dir.reccursion && dir.reccursion.excluded_folders || []
  const useDirName = dir.reccursion && dir.reccursion.use_dir_name

  fs.readdir(dir.path, (err, fileNames) => {
    fileNames.forEach(fileName => {
      const filePath = [dir.path, fileName].join('\\')
      const isVideo = config.video_extensions.some(format => {
        return fileName.endsWith(format)
      })

      if (isVideo) {
        var anime = new Anime(
          fileName,
          useDirName && folderName
        )
        fs.rename(filePath, [dir.path, anime.name].join('\\'), function(error) {
          if (error) {
            logError(error)
          }
        })
      }

      if (dir.reccursion &&
          fs.lstatSync(filePath).isDirectory() &&
          !excludedFolder.includes(fileName)) {
        renameFiles(
          Object.assign({}, dir, {path: filePath}),
          useDirName ? fileName : null
        )
      }
    });
  })
}

config.target_dir.forEach(dir => renameFiles(dir, null))

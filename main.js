const fs = require('fs')
const prompt = require('prompt-sync')()

const config = require('./src/config.json')
const {Anime} = require('./src/Anime.js')

/**
 * @param {String} error
 */
function logIfError(error) {
  if (!error) {
    return
  }

  console.error(error)
  fs.writeFile('./logs/log.txt', error, function(logWritingError) {
      if (logWritingError) {
          console.error(logWritingError)
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
  const excludedFiles = dir.reccursion && dir.reccursion.excluded_files || []
  const useDirName = dir.reccursion && dir.reccursion.use_dir_name

  fs.readdir(dir.path, (err, fileNames) => {
    fileNames.forEach(fileName => {
      if (excludedFiles.includes(fileName)) {
        return
      }
      const isDowloading = fileNames.includes(fileName + '.part')
      if (config.skip_downloading_content && isDowloading) {
        return
      }

      const filePath = [dir.path, fileName].join('\\')
      const isVideo = config.video_extensions.some(format => fileName.endsWith(format))
      if (isVideo) {
        const anime = new Anime(fileName, useDirName && folderName)

        const number = folderName && anime.isFailed ?
          prompt('What is the episode for ' + folderName + '? (default ' + anime.number + ') ') :
          anime.number
        const fileName = anime.getFileName({number: number})

        fs.rename(filePath, [dir.path, fileName].join('\\'), logIfError)
      }

      if (dir.reccursion && fs.lstatSync(filePath).isDirectory()) {
        var fileConfig = Object.assign({}, dir, {path: filePath})
        renameFiles(fileConfig, useDirName ? fileName : null)
      }
    });
  })
}

config.target_dir.forEach(dir => renameFiles(dir, null))

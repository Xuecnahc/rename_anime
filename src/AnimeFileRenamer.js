const fs = require('fs')
const path = require('path');
const readLineSync = require('readline-sync')

const {FilesUtils} = require('./FilesUtils.js')
const {Anime} = require('./Anime.js')
var appDir = path.dirname(require.main.filename);

class AnimeFileRenamer {
  /**
   * Util to rename anime in file system using a given config
   *
   * @class
   * @param {Object} config
   * @param {Object[]} config.target_dir
   * @param {String} config.target_dir[].path
   * @param {Object} [config.target_dir[].reccursion]
   * @param {Boolean} [config.target_dir[].reccursion.use_dir_name=false]
   * @param {String[]} [config.target_dir[].reccursion.excluded_files=[]]
   * @param {String[]} config.video_extensions
   * @param {String} [config.skip_downloading_content=false]
   * @param {String} [config.skip_downloading_content=false]
   * @param {String[]} [config.banned_words=[]]
   * @param {String[]} [config.failure_words=[]]
   */
  constructor(config) {
    this.config = config
  }

  /**
   * @private
   *
   * @param {Map} dir
   * @param {String} dir.path
   * @param {Map} [dir.reccursion]
   * @param {Boolean} [dir.reccursion.use_dir_name=false]
   * @param {String[]} [dir.reccursion.excluded_folders=[]]
   * @param {String} [folderName]
   */
   _renameFiles(dir, folderName) {
    const excludedFiles = dir.reccursion && dir.reccursion.excluded_files || []
    const useDirName = dir.reccursion && dir.reccursion.use_dir_name

    const fileNames = fs.readdirSync(dir.path)
    fileNames.forEach(fileName => {
      if (excludedFiles.includes(fileName)) {
        return
      }
      const isDowloading = fileNames.includes(fileName + '.part')
      if (this.config.skip_downloading_content && isDowloading) {
        return
      }

      const filePath = path.join(dir.path, fileName)
      const isVideo = this.config.video_extensions.some(format => fileName.endsWith(format))
      if (isVideo) {
        const anime = new Anime(fileName, useDirName && folderName)

        const number = folderName && anime.isFailed ?
          readLineSync.question('What is the episode for ' + folderName + '? (default ' + anime.number + ') ') :
          anime.number
        const animeName = anime.getFileName({number: number})

        FilesUtils.rename(filePath, path.join(dir.path, animeName))
      } else if (dir.reccursion && fs.lstatSync(filePath).isDirectory()) {
        var fileConfig = Object.assign({}, dir, {path: filePath})
        this._renameFiles(fileConfig, useDirName ? fileName : null)
      }
    })
  }

  /**
   * @public
   */
  renameAll() {
    this.config.target_dir.forEach(dir => this._renameFiles(dir, null))
  }
}

exports.AnimeFileRenamer = AnimeFileRenamer;

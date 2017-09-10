const fs = require('fs')
const path = require('path')

const appDir = path.join(__dirname, '..')

class FilesUtils {
  /**
   * @public
   *
   * @param {String} folderPath relative folder path from the app folder
   */
  static mkdirpSync(folderPath) {
    const relativePath = path.relative(appDir, folderPath)
    const pathParts = relativePath.split(path.sep)

    pathParts.forEach((part, index) => {
      if (part === '.' || part === '..') {
        return
      }

      const dirPath = path.join.apply(null, pathParts.slice(0, index + 1))
      fs.existsSync(dirPath) || fs.mkdirSync(dirPath, '0777')
    })
  }

  static rmdirSync(dir) {
    const fileNames = fs.readdirSync(dir)
    fileNames.forEach(fileName => {
      const filePath = path.join(dir, fileName);
      if (filePath == "." || filePath == "..") {
        return
      }

      if (fs.statSync(filePath).isDirectory()) {
        this.rmdirSync(filePath)
      } else {
        fs.unlinkSync(filePath)
      }
    })

  	fs.rmdirSync(dir);
  }

  /**
   * @public
   *
   * @param {String} error
   */
  static logError(error) {
    console.error(error)
    const logFilePath = path.join(appDir, this.config.log_dir + 'log.txt')
    mkdirpSync(path.dirname(logFilePath))
    fs.writeFile(logFilePath, error, function(logWritingError) {
        if (logWritingError) {
            console.error(logWritingError)
        }
    })
  }
}

exports.FilesUtils = FilesUtils;

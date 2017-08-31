const config = require('./config.json')

class Anime {
  /**
   * Util object for parsing anime informations
   *
   * @class
   * @param {String} fileName
   * @param {String} [folderName]
   */
  constructor(fileName, folderName) {
    this.fileName = fileName

    const info = this._getInfos(fileName)
    const seriesName = folderName || info.name
    this.name = seriesName + ' - ' + info.number + '.' + info.extension
    this.isFailed = info.isFailed
  }

  /**
   * @param {String} fileName
   *
   * @returns {Map} info
   * @returns {String} info.nqme
   * @returns {String} info.number
   * @returns {String} info.extension
   * @returns {Boolean} info.isFailure
   */
  _getInfos(fileName) {
    const splitedName = fileName.split('.')
    const extension = splitedName.pop(); // remove extension
    var sanitizedName = splitedName.join('.').replace(/-|_/g, ' ')
      .replace(/ *\([^)]*\) */g, '') // remove text between brackets
      .replace(/ *\[[^\]]*\) */g, '') // remove text between square brackets

    config.banned_words.forEach(word => {
      sanitizedName = sanitizedName.replace(word, '')
    })

    const number = sanitizedName.match(/\d+(?=\D*$)/)[0]
    const name = sanitizedName.substring(0, sanitizedName.lastIndexOf(number)).trim()

    // If the name is equals to it the renaming is considered as failed
    const isFailed = config.failure_words.includes(name)
    return {
      name: name,
      number: number.length < 2 ? '0' + number : number,
      extension: extension,
      isFailed: isFailed
    }
  }
}

exports.Anime = Anime;

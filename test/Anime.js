const assert = require('assert')
const proxyquire = require('proxyquire')

const {AnimeNames} = require('./constants/AnimeNames.js')
const testConfig = require('./configs/anime-test.json')
const {Anime} = proxyquire('../src/Anime.js', {'./config.json': testConfig})

describe('Anime', function() {
  describe('#getFileName', function() {
    it('should rename the anime in a nice way', function() {
      const anime = new Anime(AnimeNames.rawFileNameSuccess)
      assert.equal('Mon Bel Anime - 01.mp4', anime.getFileName({}))
    });

    it('should rename the anime in a nice way with episode number', function() {
      const anime = new Anime(AnimeNames.rawFileNameSuccess)
      assert.equal('Mon Bel Anime - 04.mp4', anime.getFileName({number: 4}))
    });

    it('should tell naming failure', function() {
      const anime = new Anime(AnimeNames.rawFileNameFail)
      assert(anime.isFailed)
      assert.equal(1, anime.number)
      assert.equal('mp4', anime.extension)
    });
  });
});

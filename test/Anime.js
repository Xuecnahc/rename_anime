const assert = require('assert');
const proxyquire = require('proxyquireify')(require)

const testConfig = require('./anime-test-config.json')
const {Anime} = proxyquire('../src/Anime.js', {'./config.json': testConfig})

const TEST_RAW_FILE_NAME = '[CoolFansub] Mon_Bel-Anime Episode 1 (720p).mp4'
const TEST_RAW_FILE_NAME_FAILURE = 'anime 1.mp4'

describe('Anime', function() {
  describe('#constructor', function() {
    it('should rename the anime in a nice way', function() {
      const anime = new Anime(TEST_RAW_FILE_NAME)
      assert.equal('Mon Bel Anime - 01.mp4', anime.getFileName({}))
    });

    it('should rename the anime in a nice way with episode number', function() {
      const anime = new Anime(TEST_RAW_FILE_NAME)
      assert.equal('Mon Bel Anime - 04.mp4', anime.getFileName({number: 4}))
    });

    it('should tell naming failure', function() {
      const anime = new Anime(TEST_RAW_FILE_NAME_FAILURE)
      assert(anime.isFailed)
      assert.equal(1, anime.number)
      assert.equal('mp4', anime.extension)
    });
  });
});

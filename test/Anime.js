const assert = require('assert');
const proxyquire = require('proxyquireify')(require)

const testConfig = require('./anime-test-config.json')
const {Anime} = proxyquire('../src/Anime.js', {'./config.json': testConfig})

describe('Anime', function() {
  describe('#constructor', function() {
    it('should rename the anime in a nice way', function() {
      const anime = new Anime('[CoolFansub] Mon_Bel-Anime Episode 1 (720p).mp4')
      assert.equal('Mon Bel Anime - 01.mp4', anime.name)
    });

    it('should tell naming failure', function() {
      const anime = new Anime('anime 1.mp4')
      assert(anime.isFailed)
      assert.equal(1, anime.number)
      assert.equal('mp4', anime.extension)
    });
  });
});

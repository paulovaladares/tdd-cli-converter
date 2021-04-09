/* eslint-disable no-unused-expressions */
/* eslint-disable spaced-comment */
const expect = require('chai').expect;
const exec = require('child_process').exec;
const btcConverter = './src/main.js'; // chmod+x file to permit executable
const pkg = require('../package.json');

describe('Man CLI', () => {
  // parameter "done" when async
  it('should retunr the version when run --version', done => {
    /*
     * exec(command to execute, callback w/ 3 parameters:
     * ("error", "output of terminal", "output error") => {}
     */
    exec(`${btcConverter} --version`, (err, stdout, st) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.equal(pkg.version);
      done();
    });
  });

  it('should return a description when run help', done => {
    exec(`${btcConverter} --help`, (err, stdout, st) => {
      expect(stdout.includes('Cli converter for / to any currencies')).to.be
        .true;
      done();
    });
  });
});

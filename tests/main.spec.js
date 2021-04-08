/* eslint-disable spaced-comment */
const expect = require('chai').expect;
const exec = require('child_process').exec;
const btcConverter = './src/main.js'; // chmod+x file to permit executable

describe('Man CLI', () => {
  // parameter "done" when async
  it('should retunr Hello World', done => {
    /*
     * exec(file to execute, callback w/ 3 parameters:
     * ("error", "output of terminal", "output error") => {}
     */
    exec(btcConverter, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.equal('Hello World!');
      done();
    });
  });
});

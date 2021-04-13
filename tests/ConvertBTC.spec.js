/* eslint-disable no-console */
const chalk = require('chalk');
const chai = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const convertBTC = require('../src/ConvertBTC');

const expect = chai.expect;

chai.use(sinonChai);

describe('ConvertBTC', () => {
  let consoleStub;

  const responseMock = {
    USD_BRL: 5.733701,
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  // https://free.currconv.com/api/v7/convert?q=USD_BRL&compact=ultra&apiKey=check-email
  it('should use currency USD and 1 as amount default', done => {
    nock('https://free.currconv.com')
      .get('/api/v7/convert')
      .query({
        q: 'USD_BRL',
        compact: 'ultra',
        apiKey: 'cfd5130022add1516ceb',
      })
      .reply(200, responseMock);

    convertBTC();
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(
        `${chalk.blue('1')} ${chalk.cyan('USD')} to BRL = ${chalk.green(
          '5.734',
        )}`,
      );
      done();
    }, 300);
  });

  it('should use currency USD and 15 as amount', done => {
    nock('https://free.currconv.com')
      .get('/api/v7/convert')
      .query({
        q: 'USD_BRL',
        compact: 'ultra',
        apiKey: 'cfd5130022add1516ceb',
      })
      .reply(200, responseMock);

    convertBTC('USD', 15);
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(
        `${chalk.blue('15')} ${chalk.cyan('USD')} to BRL = ${chalk.green(
          '86.006',
        )}`,
      );
      done();
    }, 300);
  });

  it('should message user when api reply with error', done => {
    nock('https://free.currconv.com')
      .get('/api/v7/convert')
      .query({
        q: 'USD_BRL',
        compact: 'ultra',
        apiKey: 'cfd5130022add1516ceb',
      })
      .replyWithError('Error');

    convertBTC('USD', 15);
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(
        chalk.red('Something went wrong in the API. Try again in few minutes.'),
      );
      done();
    }, 300);
  });
});

/* eslint-disable no-console */
const chalk = require('chalk');
const request = require('request');
const ora = require('ora');

const spinner = ora({
  text: 'Converting currency...',
  color: 'yellow',
});

function ConvertBTC(currency = 'USD', amount = 1) {
  const url = `https://free.currconv.com/api/v7/convert?q=${currency}_BRL&compact=ultra&apiKey=cfd5130022add1516ceb`;
  spinner.start();
  request(url, (error, response, body) => {
    let apiResponse;
    spinner.stop();
    try {
      apiResponse = JSON.parse(body);
      const conversion = `${currency}_BRL`;
      console.log(
        `${chalk.blue(amount)} ${chalk.cyan(currency)} to BRL = ${chalk.green(
          Number(apiResponse[conversion] * amount).toFixed(3),
        )}`,
      );
    } catch (parseError) {
      console.log(
        chalk.red('Something went wrong in the API. Try again in few minutes.'),
      );
    }
  });
  // ` BTC to  = 2000.00`;
}

module.exports = ConvertBTC;

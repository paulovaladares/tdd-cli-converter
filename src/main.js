#!/usr/bin/env node
/* eslint-disable no-console */

const program = require('commander');
const pkg = require('../package.json');
const convertBTC = require('./ConvertBTC');

program
  .version(pkg.version)
  .description(pkg.description)
  .option(
    '-C, --currency <currency>',
    'Currency to be converted. (Default: USD)',
  )
  .option('-A, --amount <amount>', 'Value in Bitcoin to convert. (Default: 1)')
  .parse(process.argv);

convertBTC(program.currency, program.amount);

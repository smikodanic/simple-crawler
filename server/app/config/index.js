/*
 * environment dependant configuration:
 * $ export NODE_ENV=development
 * $ export NODE_ENV=stage
 * $ export NODE_ENV=production
 */

const chalk = require('chalk');
const environment = process.env.NODE_ENV || 'development';
const env = require(`./env/${environment}`);
console.log(chalk.green(`environment:: ${environment}`));

const config = {
  project_name: 'dex8-panel', // must be same as angular.json::defaultProject value
  env
};

module.exports = config;

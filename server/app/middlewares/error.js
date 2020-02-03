/**
 * Middleware for error manipulation.
 */
const chalk = require('chalk');


// check if URL is valid
module.exports.badURL = (req, res, next) => {
  console.log(chalk.red('Error 404: Url ' + req.url + ' not found'));
  res.status(404).end(); // send 404 status on bad resource request, for example: http://localhost:8201/favicon-not-exist.ico
  next();
};

// report any error to console
module.exports.reporter = (err, req, res, next) => {
  console.log(chalk.red(err.stack));
  console.log(chalk.magenta(JSON.stringify(err, null, 4)));
  next();
};


// catch all uncaught exceptions
module.exports.uncaught = () => {
  process.on('uncaughtException', (err) => {
    console.error(chalk.red(err)); //output to console
  });
};

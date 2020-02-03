/**
 * Morgan HTTP request logger
 * https://github.com/expressjs/morgan
 */

const morgan = require('morgan');

module.exports = (app, config) => {

  // log every request to the console (works only when NODE_ENV=development or NODE_ENV=)
  if (config.env.name === 'development') {
    app.use(morgan('dev'));
    // app.use(morgan('short'));
    // app.use(morgan('combined'));
  }

};

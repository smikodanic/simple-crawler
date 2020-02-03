/**
 * Node.js body parser
 * Enables sending data from form by using POST method.
 * https://www.npmjs.com/package/body-parser
 */

const bodyParser = require('body-parser');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
};

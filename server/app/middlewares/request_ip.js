/**
 * Get client IP address.
 */
const requestIp = require('request-ip');

module.exports = (req, res, next) => {
  req.client.ip = requestIp.getClientIp(req);
  next();
};

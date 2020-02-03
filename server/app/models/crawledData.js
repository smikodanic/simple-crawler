const BPromise = require('bluebird');
const mongoose = BPromise.promisifyAll(require('mongoose'));
mongoose.Promise = BPromise; //Prevent error: "mpromise (mongoose's default promise library) is deprecated"

//define model
const crawledDataModel = mongoose.model('crawledDataMD', require('./schema/CrawledData'));



/*** Common methods ***/
module.exports = require('./_commonMethods')(crawledDataModel);


/*** Specific methods ***/

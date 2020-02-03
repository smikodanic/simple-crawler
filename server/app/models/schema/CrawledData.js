const Schema = require('mongoose').Schema;

//options
const opts = require('./_options');
opts.collection = 'crawledData';


//schema definition
const Sch = new Schema({
  url: String,
  h1: String,
  h2: String,
  h3: String,
  links: [String],
}, opts);


module.exports = Sch;

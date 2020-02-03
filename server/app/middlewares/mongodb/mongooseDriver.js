/**
 * Mongoose middleware for mongoDB
 */

const mongoose = require('mongoose');
const chalk = require('chalk');
const util = require('util');

//options
const timeout = 30 * 1000; //30 seconds
const connOpts = {
  useNewUrlParser: true,
  useCreateIndex: true, // Set to true to make Mongoose's default index build use
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  connectTimeoutMS: timeout,
  poolSize: 2,
  autoReconnect: true,
  reconnectTries: 3,
  useFindAndModify: false
};



//events
const onEvent = (conn, dbConfig) => {

  //events mongoose.connection or db
  conn.on('error', (err) => {
    console.error(chalk.red(dbConfig.uri, err, 'readyState:' + conn.readyState));
  });

  conn.on('connected', () => {
    console.info(chalk.blue(dbConfig.uri, '-connected'));
  });

  conn.on('open', () => {
    // console.info(chalk.blue(dbConfig.uri, '-connection open'));
  });

  conn.on('reconnected', () => {
    console.log(chalk.blue(dbConfig.uri, '-connection reconnected'));
  });

  conn.on('disconnected', () => {
    console.log(chalk.blue(dbConfig.uri, '-connection disconnected'));
  });

  process.on('SIGINT', () => {
    mongoose.disconnect(() => {
      console.log(chalk.blue(dbConfig.uri, '-disconnected on app termination by SIGINT'));
      process.exit(0);
    });
  });
};


// make default connection when nodejs app is started (see: server/app/index.js)
module.exports.connectDefault = (dbConfig) => {

  if (!dbConfig.enabled) { return; }

  //establish mongoose connection (use 'mongoose.connection')
  const db = mongoose.connect(dbConfig.uri, connOpts);
  // console.log(util.inspect(db));

  //show events
  onEvent(mongoose.connection, dbConfig);

  return db;

};


// create connection on demand
module.exports.connect = (dbConfig) => {

  //establish mongoose connection (use 'db')
  const db = mongoose.createConnection(dbConfig.uri, connOpts);
  // console.log(util.inspect(db));

  //show events
  onEvent(db, dbConfig);

  //close connection if db is not active
  if (!dbConfig.enabled) db.close();

  return db;
};


// default schema plugins
module.exports.pluginsDefault = (schema, pluginOpts) => {
  //mongoose.plugin((schema. pluginOpts) {
  //  schema.add({datum: Date});
  //});
};

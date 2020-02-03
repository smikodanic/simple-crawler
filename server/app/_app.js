// ***access files from root, for example require('app/config')
require('rootpath')();

const config = require('./config');
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');


// get angular project directory
const ngProjectName = config.project_name;
const ngProjectDir = path.join(__dirname, '../../dist/' + ngProjectName);


/***** MIDDLEWARES *****/
require('./middlewares/logger_morgan.js')(app, config); //must be first to log each request (also static files)
app.use(require('./middlewares/request_ip.js'));
app.use(require('./middlewares/cors.js'));
require('./middlewares/bodyParser.js')(app);
require('./middlewares/mongodb/mongooseDriver').connectDefault(config.env.mongodb); // mongoose


/***** serving angular app static files *****/
app.use('/', express.static(ngProjectDir));


app.use('/api', require('./routes/api/_api'));


/***** EJS VIEW ENGINE  *****/
app.set('views', [ngProjectDir]);
// app.set('view engine', 'ejs');
app.set('view engine', 'html'); // ejs view engine with .html file extension
app.engine('html', ejs.renderFile);


/****** CLIENT SIDE ROUTES (Angular Routes) ************/
app.use((req, res, next) => {
  const regexp = new RegExp('\\.js|\\.css|\\.ico|\\.png|\\.jpg|\\.jpeg|\\.woff2$', 'ig'); // angular resource files
  const isResource = regexp.test(req.url);
  //   console.log('\nURL:: ', req.url, isResource);

  if (isResource) {
    next(); // send to check badURL
  } else {
    res.render('index');
  }
});



/******************** ERROR HANDLERS *******************/
app.use(require('./middlewares/error.js').badURL);
app.use(require('./middlewares/error.js').reporter);
require('./middlewares/error.js').uncaught();



module.exports = app;

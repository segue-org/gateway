var jwt        = require('express-jwt');
var cors       = require('cors');
var morgan     = require('morgan');
var bodyParser = require('body-parser');

var config = require('./config');

function JsonUTF8(req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
}

function setMaxListeners(req, res, next) {
  req.setMaxListeners(200);
  next();
}

function dumpJwt(req, res, next) {
  console.log(req.user);
  next();
}

module.exports = function(app) {
  app.use(cors());
  app.use(JsonUTF8);
  app.use(bodyParser());
  app.use(setMaxListeners);
  app.use(morgan("dev", {}));
 // app.use(jwt({ secret: config.secret, skip: ['/token/from-hash', '/token/from-login' ] }));
  app.use(dumpJwt);
};


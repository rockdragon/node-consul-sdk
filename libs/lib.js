var Bluebird  = require('bluebird');
var error     = console.error;
var debug     = require('debug')('consul-sdk');

function registerExitHandler (callback) {
  function exit(signal) {
    callback = callback || function() {};
    callback();
    setTimeout(function() {
      process.exit(signal);
    }, 500);
  }

  process.on('exit', function () {
    debug('process.on(exit) !!!!!!!!')
  });

  process.on('SIGTERM', function() {
    debug('SIGTERM')
    exit(-1);
  });

  process.on('SIGINT', function () {
    debug('Ctrl-C...');
    exit(2);
  });

  process.on('uncaughtException', function(e) {
    debug('Uncaught Exception...');
    error(e.stack);
    exit(99);
  });
};

function fromCallback(fn) {
  return new Bluebird(function (resolve, reject) {
    try {
      return fn(function (err, data, res) {
        if (err) {
          err.res = res;
          return reject(err);
        }
        return resolve([data, res]);
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports.registerExitHandler = registerExitHandler;
module.exports.fromCallback = fromCallback;
module.exports.error = error;
module.exports.debug = debug;
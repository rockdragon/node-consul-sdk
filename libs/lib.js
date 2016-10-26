var Bluebird  = require('bluebird');
var error     = console.error;
var debug     = require('debug')('consul-sdk');

function registerExitHandler (callback) {
  // attach user callback to the process event emitter
  // if no callback, it will still exit gracefully on Ctrl-C
  function exit(signal) {
    callback = callback || function() {};
    callback();
    setTimeout(function() {
      process.exit(signal);
    }, 500);
  }

  // do app specific cleaning before exiting
  process.on('exit', function () {
    debug('process.on(exit) !!!!!!!!')
  });

  process.on('SIGTERM', function() {
    debug('SIGTERM')
    exit(-1);
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
    debug('Ctrl-C...');
    exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
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

module.exports.exitHandler = exitHandler;
module.exports.fromCallback = fromCallback;
module.exports.error = error;
module.exports.debug = debug;
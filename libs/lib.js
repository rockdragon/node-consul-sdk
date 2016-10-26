var Bluebird = require('bluebird');

function exitHandler(fn) {
  process.on('exit', fn.bind(null));
  process.on('SIGINT', fn.bind(null));
  process.on('uncaughtException', fn.bind(null));
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
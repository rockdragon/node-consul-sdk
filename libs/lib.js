var Bluebird = require('bluebird');

function exitHandler(fn) {
  process.on('exit', fn.bind(null, { cleanup: true }));
  process.on('SIGINT', fn.bind(null, { exit: true }));
  process.on('uncaughtException', function (err) {
    fn.bind(null, { exit: true }, err)
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
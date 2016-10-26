(function () {

  var path = require('path');
  var fs = require('fs');
  var lib = require('./libs/lib')
  var error = lib.error;
  var debug = lib.debug;
  var rootDir = path.resolve('./');
  var confDir = path.resolve(rootDir, 'consul.json');

  debug('location of consul.json:', confDir);
  if (!fs.existsSync(confDir)) {
    return error('consul.json does not exists in:', confDir);
  }

  var conf = require(confDir);
  debug('content of consul.json:', conf);

  var consul = require('consul')({
    host: conf.serverHost || 'localhost',
    port: conf.serverPort || 8500,
    secure: conf.secure || false,
    promisify: lib.fromCallback
  });

  consul.agent.service.register({
    name: conf.name,
    address: conf.host,
    port: conf.port
  }).catch(function (err) {
    error(err);
  });

  lib.registerExitHandler(function () {
    consul.agent.service.deregister({
      id: conf.name
    }).catch(function (err) {
      error(err);
    });
  });

})();
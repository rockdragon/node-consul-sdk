(function () {
  var path = require('path');
  var fs = require('fs');
  var debug = require('debug')('consul-sdk');
  var lib = require('./libs/lib')
  var error = console.error;
  var rootDir = path.resolve('./');
  var confDir = path.resolve(rootDir, 'consul.json');

  debug('location of consul.json:', confDir);
  if (!fs.existsSync(confDir)) {
    return error('consul.json does not exists in:', confDir);
  }

  var conf = require(confDir);
  debug('content of consul.json:', conf);

  var consul = require('consul')({
    host: conf.serverHost,
    port: conf.serverPort,
    secure: conf.secure,
    promisify: lib.fromCallback
  });

  consul.agent.service.register({
    name: conf.name,
    address: conf.host,
    port: conf.port
  }).catch(function (err) {
    error(err);
  });

  lib.exitHandler(function () {
    debug('EXIT!!!!!!!!!!!!!!!!!!!');
    consul.agent.service.deregister({
      id: conf.name
    }).catch(function (err) {
      error(err);
    });
  });
})();
(function() {
  var debug = require('debug')('consul-sdk');
  var path = require('path')

  debug('__dirname', __dirname);
  debug('__filename', __filename);
  debug('process.cwd()', process.cwd());
  debug('path.resolve', path.resolve('./'));
})();
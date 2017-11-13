'use strict';

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _routes2.default)();

//fallback to allow react router to handle the rest
if (process.env.NODE_ENV === 'production') {
  _express.app.use((0, _expressHistoryApiFallback2.default)('index.html', { root: _config2.default.staticPath }));
}

// start the server
_express2.default.listen(_config2.default.port, function (err) {
  if (err) console.error(err);
  console.log('app started on port ' + _config2.default.port, process.env.NODE_ENV);
});
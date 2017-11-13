'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.app = undefined;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mailer = require('../middleware/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server config
var app = exports.app = (0, _express2.default)();

//app.use(sslRedirect());

//import sslRedirect from 'heroku-ssl-redirect'
app.use((0, _compression2.default)());

// reserve application with https
var server = function StartApp() {
	return _http2.default.createServer(app);
}();

// tell the app to parse HTTP body messages
app.use(_bodyParser2.default.json({ limit: _config2.default.bodyLimit }));
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_express2.default.static(_config2.default.staticPath, { redirect: false }));

process.on('uncaughtException', function (err) {
	if (process.env.NODE_ENV === 'production') {
		var subject = '#meetpa error server // Crashing process';
		var text = err.stack;
		_mailer2.default.send({
			to: 'a.blinov@meetpa.co',
			subject: subject,
			text: text
		});
	}
});

exports.default = server;
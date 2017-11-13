'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('../config/express');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _checkAuthRole = require('./middleware/checkAuthRole');

var _checkAuthRole2 = _interopRequireDefault(_checkAuthRole);

var _checkAccess = require('./middleware/checkAccess');

var _checkAccess2 = _interopRequireDefault(_checkAccess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

	// routes for auth
	_express.app.use('/api/v1/auth', (0, _auth2.default)());
};
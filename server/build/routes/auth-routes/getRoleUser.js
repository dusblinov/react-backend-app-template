'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
	// check availability headers authorization
	var headerAuth = req.headers.authorization ? req.headers.authorization : ' ';
	var checkToken = headerAuth.split(' ')[1];
	var decodedToken = void 0;
	try {
		decodedToken = _jsonwebtoken2.default.verify(checkToken, _config2.default.secret);
	} catch (err) {
		// err
	}

	if (decodedToken) {
		return res.json({
			success: true,
			role: decodedToken.role
		});
	}
	return res.status(401).json({
		success: false
	});
};
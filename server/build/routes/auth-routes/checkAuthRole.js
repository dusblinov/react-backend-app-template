'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _connection = require('../../middleware/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  The Auth Checker middleware function.
 */
exports.default = function (role) {
	return function (req, res, next) {
		if (!req.headers.authorization) {
			return res.status(401).end();
		}

		// get the last part from a authorization header string like "bearer token-value"
		var token = req.headers.authorization.split(' ')[1];
		// decode the token using a secret key-phrase
		return _jsonwebtoken2.default.verify(token, _config2.default.secret, function (error, decoded) {

			// the 401 code is for unauthorized status
			if (error) {
				return res.status(401).end();
			}
			if (role) {
				if (!_lodash2.default.includes(role, decoded.role)) {
					return res.status(401).end();
				}
			}

			return _connection2.default.query('SELECT * from users WHERE id = ? and status = ? and role = ? ', [decoded.id, 1, decoded.role], function (err, rows) {
				if (err || !rows.length) {
					return res.status(401).end();
				}
				req.decoded_token = decoded;
				req.decoded_token.user = rows[0];
				return next();
			});
		});
	};
};
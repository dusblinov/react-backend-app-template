'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _connection = require('../../middleware/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate the login form
 *
 * @param {object} req - the HTTP body message
 * @returns {object} The result of validation.
 */

var validateLoginForm = function validateLoginForm(req) {
	var errors = {};
	var isFormValid = true;
	var message = '';

	if (!req || typeof req.email !== 'string' || req.email.trim().length === 0) {
		isFormValid = false;
		errors.email = 'Please provide your email address.';
	}

	if (!req || typeof req.password !== 'string' || req.password.trim().length === 0) {
		isFormValid = false;
		errors.password = 'Please provide your password.';
	}

	if (!isFormValid) {
		message = 'Please check your credentials and try again...';
	}

	return {
		success: isFormValid,
		message: message,
		errors: errors
	};
};

exports.default = function (req, res) {
	var validationResult = validateLoginForm(req.body);

	if (!validationResult.success) {
		return res.status(401).json({
			success: false,
			message: validationResult.message,
			errors: validationResult.errors
		});
	}

	var checkBase = function checkBase(done) {
		var email = req.body.email;
		var password = req.body.password;
		// find a user by email address
		_connection2.default.query('SELECT * FROM users WHERE email = ? and status = 1', [email], function (err, rows) {
			if (err) {
				var error = new Error('Incorrect email or password');
				error.name = 'IncorrectCredentialsError';
				return done(error);
			}
			if (!rows.length) {
				var _error = new Error('Incorrect email or password');
				_error.name = 'IncorrectCredentialsError';
				return done(_error);
			}
			if (_bcryptjs2.default.hashSync(password, _config2.default.salt) !== rows[0].password) {
				var _error2 = new Error('Incorrect email or password');
				_error2.name = 'IncorrectCredentialsError';
				return done(_error2);
			}
			var payload = rows[0];
			var token = _jsonwebtoken2.default.sign(payload, _config2.default.secret);
			return done(null, rows[0], token, payload.id);
		});
	};

	_async2.default.waterfall([checkBase], function (err, user, token, userId) {
		if (err) {
			if (err.name === 'IncorrectCredentialsError') {
				return res.status(401).json({
					success: false,
					message: err.message
				});
			}

			return res.status(401).json({
				success: false,
				message: 'Could not process the form.'
			});
		}
		return res.json({
			success: true,
			message: 'You have successfully logged in!',
			token: token,
			userId: userId,
			userName: user.name
		});
	});
	return false;
};
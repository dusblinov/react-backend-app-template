import async from 'async';
import settings from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../../middleware/connection';

/**
 * Validate the login form
 *
 * @param {object} req - the HTTP body message
 * @returns {object} The result of validation.
 */

const validateLoginForm = (req) => {
	const errors = {};
	let isFormValid = true;
	let message = '';

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
		message,
		errors,
	};
};

export default (req, res) => {
	const validationResult = validateLoginForm(req.body);
	if (!validationResult.success) {
		return res.status(401).json({
			success: false,
			message: validationResult.message,
			errors: validationResult.errors,
		});
	}

	const checkBase = (done) => {
		const email = req.body.email;
		const password = req.body.password;
		// find a user by email address
		connection.query('SELECT * FROM users WHERE email = ? and status = 1', [email],
			(err, rows) => {
				if (err) {
					const error = new Error('Incorrect email or password');
					error.name = 'IncorrectCredentialsError';
					return done(error);
				}
				if (!rows.length) {
					const error = new Error('Incorrect email or password');
					error.name = 'IncorrectCredentialsError';
					return done(error);
				}
				if (bcrypt.hashSync(password, settings.salt) !== rows[0].password) {
					const error = new Error('Incorrect email or password');
					error.name = 'IncorrectCredentialsError';
					return done(error);
				}
				const payload = JSON.parse(JSON.stringify(rows[0]));
				const token = jwt.sign(payload, settings.secret);
				return done(null, rows[0], token, payload.id);
			});
	};

	async.waterfall([
		checkBase,
	], (err, user, token, userId) => {
		if (err) {
			if (err.name === 'IncorrectCredentialsError') {
				return res.status(401).json({
					success: false,
					message: err.message,
				});
			}

			return res.status(401).json({
				success: false,
				message: 'Could not process the form.',
			});
		}
		return res.json({
			success: true,
			message: 'You have successfully logged in!',
			token,
			userId: userId,
			userName: user.name,
		});
	});
	return false;
};
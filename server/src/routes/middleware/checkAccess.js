import jwt from 'jsonwebtoken';
import settings from 'config';
import _ from 'lodash';

/**
 *  The Auth Checker middleware function.
 */
export default role => (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).end();
	}

	// get the last part from a authorization header string like "bearer token-value"
	const token = req.headers.authorization.split(' ')[1];
	// decode the token using a secret key-phrase
	return jwt.verify(token, settings.secret, (error, decoded) => {

		// the 401 code is for unauthorized status
		if (error) {
			return res.status(401).end();
		}
		if (role) {
			if (!_.includes(role, decoded.role)) {
				return res.status(401).end();
			}
		}

		req.decoded_token = decoded;
		return next();
		
	});
};
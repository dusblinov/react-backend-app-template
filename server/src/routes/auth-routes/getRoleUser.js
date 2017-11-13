import settings from 'config';
import jwt from 'jsonwebtoken';

export default (req, res) => {
  // check availability headers authorization
	const headerAuth = req.headers.authorization ? req.headers.authorization : ' ';
	const checkToken = headerAuth.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(checkToken, settings.secret);
	} catch (err) {
    // err
	}

	if (decodedToken) {
		return res.json({
			success: true,
			role: decodedToken.role,
		});
	}
	return res.status(401).json({
		success: false,
	});
};

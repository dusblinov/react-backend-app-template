var path = require('path');

var rootPath = path.join(__dirname, '/../..');
var staticPath = path.join(__dirname, '/../client/public/');

var settings = {
	rootPath: rootPath,
	staticPath: staticPath,
	envPath: __dirname,
	port: 9000,
	mysqlPool: {
		host: 'localhost',
		user: 'root',
		password: 'securepass',
		database: '',
		multipleStatements: true,
		connectionLimit: 100,
		charset : ''
	},
	bodyLimit: '100kb',
	adminEmail: '',
	emailFrom: '',
	mailgun: {
		apiKey: '',
		domain: ''
	},
	cryptAlgorithm: '',
	cryptKey: '',
	secret: '',
	salt: '',
	env: process.env.NODE_ENV,
	braintree: {
		environment: 'Sandbox',
		merchantId: "",
		publicKey: "",
		privateKey: ""
	}
}
module.exports = settings;

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
		database: 'meetpa',
		multipleStatements: true,
		connectionLimit: 100,
		charset : 'utf8mb4'
	},
	bodyLimit: '100kb',
	adminEmail: 'dus.blinov@gmail.com',
	emailFrom: 'noreply@meetpa.co',
	mailgun: {
		apiKey: 'key-e6e4cfd91ba4c399b3a714b416fe6979',
		domain: 'mg.meetpa.co'
	},
	cryptAlgorithm: 'aes-256-ctr',
	cryptKey: 'DWw2uRhh3jBk3hMT6Cm8vP3CESBIxQrx',
	secret: 'uIxQT6PrxCmB28v',
	salt: 'mC$2bh4ZOa$1ENMOiXaNvkXN9B0$w',
	env: process.env.NODE_ENV,
	braintree: {
		environment: 'Sandbox',
		merchantId: "p3jtcfh6khbnxjpc",
		publicKey: "nkngfkhtpd5kpprx",
		privateKey: "cae542c12a4b05501ddff17edceb8588"
	}
}
module.exports = settings;
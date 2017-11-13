import http from 'http';
// import sslRedirect from 'heroku-ssl-redirect'
import express from 'express';
import compression from 'compression';
import settings from 'config';
import bodyParser from 'body-parser';
import Mailer from '../middleware/mailer';


// server config
export const app = express();

// app.use(sslRedirect());
app.use(compression());

// reserve application with https
const server = (function StartApp() {
	return http.createServer(app);
}());

// tell the app to parse HTTP body messages
app.use(bodyParser.json({ limit: settings.bodyLimit }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(settings.staticPath, { redirect: false }));

process.on('uncaughtException', (err) => {
	if (process.env.NODE_ENV === 'production') {
		const subject = '#meetpa error server // Crashing process';
		const text = err.stack;
		Mailer.send({
			to: 'a.blinov@meetpa.co',
			subject,
			text
		});
	} else {
		console.log(err);
	}
});

export default server;

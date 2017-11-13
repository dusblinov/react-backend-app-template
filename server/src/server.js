import fallback from 'express-history-api-fallback';
import settings from 'config';
import server, { app } from './config/express';
import routes from './routes/routes';


routes();
// fallback to allow react router to handle the rest
if (process.env.NODE_ENV === 'production') {
 app.use(fallback('index.html', { root: settings.staticPath }));
}

// start the server
server.listen(settings.port, (err) => {
  if (err) console.error(err);
  console.log(`app started on port ${settings.port}`, process.env.NODE_ENV);
});
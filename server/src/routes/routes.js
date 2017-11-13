import { app } from '../config/express';
import authRoutes from './auth';
// import checkAuthRole from './middleware/checkAuthRole';
// import checkAccess from './middleware/checkAccess';

export default () => {

	// routes for auth
	app.use('/api/v1/auth', authRoutes());
	
	
};

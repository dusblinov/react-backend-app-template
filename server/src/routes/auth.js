import { Router } from 'express';

import {
  userLogin,
	getRoleUser
} from './auth-routes/_methods';


export default () => {
	const routes = Router();

	routes
		.post('/role', getRoleUser)
    .post('/login', userLogin);
		

	return routes;
};


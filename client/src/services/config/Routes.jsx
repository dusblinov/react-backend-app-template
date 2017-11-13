import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ModalContainer } from 'react-router-modal';

import withTracker from '../utils/withTracker';
import App from './App';

import Dashboard from 'screens/Dashboard';

import Login from 'screens/Login';
import LogOut from 'screens/LogOut';
// General screens part
import NotFound from 'components/NotFound';

// utils for check authorization status
import { checkLogin, checkCredentials } from 'services/utils/requireAuth';

const PrivateRoute = ({ component: Component, isAuthenticated, redirectTo, ...rest}) => (
	<Route
		{...rest}
		render = { props => (
			isAuthenticated(redirectTo, () => {
				return ( <Component {...props} /> );
			})
		)}
	/>
);

const router = () => (
	<Router history={this.history} >
		<App>
			<Switch>
				<Route exact path='/' component={checkCredentials(withTracker(Dashboard))} />
				<PrivateRoute exact path="/login" component={withTracker(Login)} isAuthenticated={checkLogin} redirectTo='/' />
				<Route exact path="/logout" component={withTracker(LogOut)} />
				<Route path="*" component={withTracker(NotFound)} />
			</Switch>
			<ModalContainer />
		</App>
	</Router>
);

export default router;

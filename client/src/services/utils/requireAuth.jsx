import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Auth from './Auth';
import fetchJSON from './fetchJSON';

/**
 * when entering the page to check if the user has access to them
 */ 
const checkRole = (next) => {
	// create an AJAX request
	fetchJSON('/api/v1/auth/role', {
		method: 'post',
	}).then(data => { next(data.role) }).catch((err) => { next(false)});
};

// export const checkCredentials = (redirectTo, next) => {
// 	if (!Auth.isUserAuthenticated()) {
// 		return ( <Redirect to={{ pathname: '/login' }} /> );
// 	}
// 	let isLoading = true;
// 	checkRole((role) => {
// 		console.log(role);
// 		if (role === 'host' || role === 'admin') {
// 			console.log('next');
// 			isLoading = false;
// 			return next();
// 		}
// 		console.log('no render')
// 		return ( <Redirect to={{ pathname: '/login' }} /> );
// 	});
// 	console.log('otvet')
// 	if (isLoading) {
// 		return(
// 			<div>loading</div>
// 		)
// 	}
// 	return false;
// };


export const checkCredentials = (Component) => {
  class AuthenticatedComponent extends React.Component {
		state = {
			isLoggedIn: false
		}
    componentWillMount() {
      this.checkAuth();
    }
		
    checkAuth() {
			checkRole((role) => {
				console.log(role);
				if (role === 'host' || role === 'admin') {
					this.setState({
						isLoggedIn: true
					})
				} else {
					const location = this.props.location;
					const redirect = location.pathname + location.search;

					this.props.history.push(`/login?redirect=${redirect}`);
				}
			})
    }
    render() {
      return this.state.isLoggedIn
        ? <Component { ...this.props } />
        : null;
    }
  }

	return withRouter(AuthenticatedComponent);
}

export const checkLogin = (redirectTo, next) => {
	if (Auth.isUserAuthenticated()) {
		return ( <Redirect to={{ pathname: redirectTo }} /> );
	} else {
		return next();
	}
};

export default checkCredentials;

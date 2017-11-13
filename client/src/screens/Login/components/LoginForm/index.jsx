// This is form for login into admin/host dashboard

import React from 'react';
import PropTypes from 'prop-types';

import Copyright from 'components/Copyright';
import Logo from 'components/images/meetpa-logo.svg';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  isLoading, 
	forgotPass,
	mode
}) => (
	<div className="inner">
    	<form className="landing-form" action="/" onSubmit={onSubmit}>
			<img src={Logo} className="landing-logo" alt="" />
			<div className="mp-card">
				<input
					required
					type="email" 
					name="email"
					value={user.email} 
					onChange={onChange}
					placeholder="Email"
					autoFocus = {true}
				/>
				<input
					required
					type="password" 
					name="password"
					value={user.password} 
					onChange={onChange}
					placeholder="Password"
				/>
				<button className="landing-btn mp-btn mp-btn--dark" disabled={isLoading} type="submit" >Log In</button>
			</div>
    </form>
		<Copyright />
	</div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired, 
	mode: PropTypes.string
};

export default LoginForm;
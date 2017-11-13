import React from 'react';
// import static env
import Settings from 'services/config/Settings';
import Auth from 'services/utils/Auth';
import LoginForm from './components/LoginForm';
import Notify from 'services/utils/Notify';

class Login extends React.Component {

  state = {
    isLoading: false,
    userEmail: '',
    userPassword: '',
    errors: {},
    successMessage: '',
    user: {
      email: '',
      password: ''
    }
  }

	componentDidMount = () => {
		document.title = `Login | ${Settings.title}`;
  }

	processLogin = (event, next) => {
				 
		this.setState({isLoading: true});
		
    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/v1/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
			var serverResponse = JSON.parse(xhr.responseText);
			console.log(serverResponse);
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          errors: {}
        });
        // save the token
        Auth.loginUser(serverResponse.token, serverResponse.userId, serverResponse.userName);
				next(null);				
      } else {
        // failure
        // change the component state
        const errors = serverResponse.errors ? serverResponse.errors : {};
        errors.summary = serverResponse.message;
       this.setState({
          errors
        });
				Notify( errors.summary, 'error');
				this.setState({isLoading: false});
				next(true)
      }
    });
    xhr.send(formData);
	}
  
	/**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = (event) => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
		this.processLogin(event, (err) => {
			if (err) {
				return false;
			}
			
			return this.props.history.push('/');
		})
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser = (event) => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }
  render() {
    return (
      <LoginForm
        onSubmit = {this.processForm}
        onChange = {this.changeUser}
        errors = {this.state.errors}
        successMessage = {this.state.successMessage}
        user = {this.state.user}
        isLoading = {this.state.isLoading}
        forgotPass = {this.forgotPass}
        mode = {this.props.mode}
      />
    )    
  }
}

export default Login;

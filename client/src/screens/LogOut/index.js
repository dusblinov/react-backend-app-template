import { Component } from 'react';

import Auth from 'services/utils/Auth';

class LogOut extends Component {

  componentDidMount() {
    Auth.deauthenticateUser();
    window.location.href = "/login";
  }

  render() { return null; }
}

export default LogOut;

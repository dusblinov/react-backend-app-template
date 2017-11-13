/**
 * Auth to identify the user 
 * checks for a token in the local store
 */
import Cookies from 'js-cookie';

class Authenticate {
  constructor(n){
    this.n = n;
  }
  /**
   * Save the token in Local Storage
   *
   * @param {string} token
   */
  static loginUser(token, userId, userName) {
    Cookies.set('token', token, { expires: 30 });
		Cookies.set('user_name', userName, { expires: 30 });
  }

  /**
   * Checking user authorization
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return Cookies.get('token') !== null && Cookies.get('token') !== undefined && Cookies.get('token') !== 'undefined';
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    Cookies.remove('token');
		Cookies.remove('user_name');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return Cookies.get('token');
  }
  

}

export default Authenticate;
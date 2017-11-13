import React from 'react';
import { Link } from 'react-router-dom';

import notFound from 'components/images/notFound.svg'

class NotFound extends React.Component {

  componentDidMount() {
    document.title = '404 Page Not Found';
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="child-vertical">
            <div className="container">
              <img src={notFound} className="module-notfound-img" alt="" />
              <p className="module-notfound-message">Sorry, we can’t find this page</p>
              <div>
              <Link to="/" className="module-notfound-btn mp-btn mp-btn--dark">Try again</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default NotFound;

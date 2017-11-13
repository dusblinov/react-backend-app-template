import React from 'react';

// import static env
import Settings from 'services/config/Settings';

class Copyright extends React.Component {
  render() {
    return (
			<div className="copyright copyright-fixed-bottom">{Settings.title} © {(new Date().getFullYear())}</div>
		)
  }
};

export default Copyright;

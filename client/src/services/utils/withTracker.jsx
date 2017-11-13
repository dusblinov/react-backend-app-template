import React from 'react';

import Settings from 'services/config/Settings';

if (Settings.analytics.google !== 'null') {
	//GoogleAnalytics.initialize(Settings.analytics.google);
}

if (Settings.analytics.amplitude !== 'null') {
	//Amplitude.initialize(Settings.analytics.amplitude);
}

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
		if (Settings.analytics.google !== 'null') {
// 			GoogleAnalytics.set({
// 				page,
// 				...options,
// 			});
// 			GoogleAnalytics.pageview(page);
		}
		// if (Settings.analytics.amplitude !== 'null') {
		//	Amplitude.event('PAGE: ' + page);
		// }
  };

  const HOC = class extends React.Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withTracker;
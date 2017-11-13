import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Notification from 'components/Notification';

class App extends Component {
  componentDidMount() {
    const node = document.createElement('div');
    document.body.appendChild(node);
    ReactDOM.render(<Notification />, node);
  }
  render() {
    return (
      this.props.children 
    )
  }
};

export default App;

import React from 'react';
import { Notification } from 'react-notification';

import Eventer from 'services/utils/Eventer';


class Notificat extends React.Component {
  state = {
		isActive: false,
		message: '',
		notifyType: 'success'
	}
  componentDidMount() {
    //subscribe to notifications from eventer
    Eventer.on('notification', (n) => {
      this.setState({
        isActive: true,
        message: n.text,
        notifyType: n.type
      });
      setTimeout(()=>{
        this.setState({ isActive: false });
      },3000);
    });
  }
  render() {
    return (
			<Notification
				isActive={this.state.isActive}
				message={this.state.message}
				barStyle={{bottom: '4em', backgroundColor: (this.state.notifyType === 'error') ? 'red' : 'green'}}
			/> 
    )
	}

};

export default Notificat;

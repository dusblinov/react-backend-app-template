/*
 * event machine for pub-sub throughout the app
 */

import EventEmitter2 from 'eventemitter2';

const eventer = new EventEmitter2();

eventer.onAny((e, v) => {
 // console.log('eventer event: ' + e);
});

export default eventer;

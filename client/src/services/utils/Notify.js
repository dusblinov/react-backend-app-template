import Eventer from './Eventer';

export default function(text, type='success') {
  Eventer.emit('notification', {text, type});
}


import {EventEmitter} from 'events';

export class MessageEventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();
    let out = '';
    connection.on('data', (data) => {
      out += data.string;
    });
    connection.on('end', () => {
      this.emit('message', JSON.parse(out));
    });
  }
}

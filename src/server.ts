import {EventEmitter} from 'events';
import * as chalk from 'chalk';
import {Note} from './nota';
import {MessageEventEmitterServer} from './eventEmitterServer';
import * as net from 'net';
import {Method} from './method';
import {ResponseType} from './type/response';

net.createServer((connection) => {
  const server = new MessageEventEmitterServer(connection);
  server.on('message', (message) => {
    switch (message.action) {
      case 'add':
        let result: Boolean = False;
        const nota = new Note(message.title, messsage.body. message.color);
        new method().add(nota, message.user, (data, _) => {
          if (data) {
            result = True;
          }
        });
        const resquest: ResponseType = {
          type: 'add',
          succes: result
        }
        connection.write(JSON.stringify(resquest))
        break;
      default:
        break;
    }
  });
}).listen(60300);

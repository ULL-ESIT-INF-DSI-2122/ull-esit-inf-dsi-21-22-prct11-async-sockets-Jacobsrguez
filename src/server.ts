import {EventEmitter} from 'events';
import * as chalk from 'chalk';
import {Note} from './nota';
import {MessageEventEmitterServer} from './eventEmitterServer';
import * as net from 'net';
import {Method} from './method';

net.createServer((connection) => {
  const server = new MessageEventEmitterServer(connection);
  server.on('message', (message) => {
    switch (message.action) {
      case 'add':
        connection.write(JSON.stringify({
          action: 'add',
        }));
        break;
      default:
        console.log(chalk.red('Accion no reconocida'));
        break;
    }
  });
}).listen(60300);

// import {Note} from './nota';
import {MessageEventEmitterServer} from './eventEmitterServer';
import * as net from 'net';
// import {Method} from './method';
import {ResponseType} from './type/response';

net.createServer((connection) => {
  const server = new MessageEventEmitterServer(connection);
  server.on('message', (message) => {
    const result: Boolean = false;
    switch (message.action) {
      case 'add':
        // const notaAdd = new Note(message.title, message.body, message.color);
        /*
        new Method().add(notaAdd, message.user, (_, data) => {
          if (data) {
            result = true;
          }
        });
        */
        const responseAdd: ResponseType = {
          type: 'add',
          success: result,
        };
        connection.write(JSON.stringify(responseAdd));
        break;
      case 'update':
      /*
      new Method().edit(message.user, message.title, message.body, message.color, (_, data) => {
          if (data) {
            result = true;
          }
        });
        */
        const responseUpdate: ResponseType = {
          type: 'update',
          success: result,
        };
        connection.write(JSON.stringify(responseUpdate));
        break;
      case 'remove':
        /*
        new Method().remove(message.user, message.title, (_, data) => {
          if (data) {
            result = true;
          }
        });
        */
        const responseRemove: ResponseType = {
          type: 'remove',
          success: result,
        };
        connection.write(JSON.stringify(responseRemove));
        break;
      case 'list':
        // let arrayNotas: Note[]= [];
        /*
        new Method().list(message.user, (_, data) => {
          if (data) {
            arrayNotas = data;
            result = true;
          }
        });
        */
        const responseList: ResponseType = {
          type: 'list',
          success: result,
          // notes: arrayNotas,
        };
        connection.write(JSON.stringify(responseList));
        break;
      default:
        connection.write(JSON.stringify("Error en el tipo de accion"));
        break;
    }
  });
}).listen(60300);

import {spawn} from 'child_process';
import * as net from 'net';
import * as fs from 'fs';

net.createServer({allowHalfOpen: true}, (connection) => {
  console.log('A client has connected.');
  let out = '';
  connection.on('data', (data) => {
    out += data.toString();
  });
  connection.on('end', () => {
    console.log('La instruccion a seguir es: ' + out.toString());
    const vector = out.toString().split(' ');
    const body = vector.slice(1, vector.length);
    const file = vector[vector.length - 1];
    fs.existsSync(file) ? console.log('El archivo existe') : console.log('El archivo no existe');
    const cat = spawn(vector[0], body);
    cat.stdout.on('data', (data) => {
      connection.write(data);
      connection.end();
    });
  });
  connection.on('close', () => {
    console.log('A client has disconnected.');
    connection.end();
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});

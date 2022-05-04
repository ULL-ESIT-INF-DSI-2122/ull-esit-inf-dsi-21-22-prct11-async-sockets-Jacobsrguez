import * as net from 'net';

const client = net.connect({port: 60300});
if (process.argv.length !== 3) {
  console.log('Please, provide a filename.');
} else {
  client.write(process.argv[2]);
  client.end();
  client.on('data', (dataJSON) => {
    console.log(dataJSON.toString());
  });
}


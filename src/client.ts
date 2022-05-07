import {connect} from 'net';
import {MessageEventEmitterClient} from "./eventEmitterClient";
const client = new MessageEventEmitterClient(connect({port: 60300}));
client.on('message', (message) => {

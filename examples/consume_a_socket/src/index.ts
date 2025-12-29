import * as net from 'node:net';
import { once } from 'node:events';
import { Node } from '@far-analytics/nodes';

net.createServer((socket: net.Socket) => socket.pipe(socket)).listen(3000);
const socket = net.createConnection({ port: 3000 });
await once(socket, 'connect');
export const socketHandler = new Node<Buffer, Buffer>(socket);
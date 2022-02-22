#!/usr/bin/env node

const net = require('net');
const chatServer = net.createServer();
const clientlist = [];

const broadcast = (message, client) => {
    clientlist.filter(item => item !== client)
    .forEach(item => item.write(message));
}

chatServer.on('connection', (client) => {
    client.write('Hi guest' + '!\n');
    clientlist.push(client);
    client.on('data', (data) => broadcast(data,client));

    client.on('end', () => {

        console.log('client end', clientlist.indexOf(client));
        clientlist.splice(clientlist.indexOf(client), 1);

    });

    client.on('error', err => console.log(err));
})

chatServer.listen(9000);
#!/usr/bin/env node
import app from '../app.js'
import debug from 'debug'

import cluster from 'cluster'
import os from 'os'
const cpus = os.cpus();

import http from 'http'
import https from 'https'

http.globalAgent.keepAlive = true;
https.globalAgent.keepAlive = true;

import dnscache from 'dnscache'

dnscache({
  "enable" : true,
  "ttl" : 300,
  "cachesize" : 1000
})

const log = debug('livro_nodejs:www');
const onWorkerError = (code, signal) => log(code, signal);

if(cluster.isMaster) {
    cpus.forEach(_ => {
        const worker = cluster.fork() 
        worker.on('error', onWorkerError);
    })

    
    cluster.on('exit', (err) =>  { 
        const newWorker = cluster.fork();
        newWorker.on('error', onWorkerError);

        log('A new worker rises', newWorker.process.pid)
    });

    cluster.on('exit', (err) => log(err));

    }
else {
    const server = app.listen(3000,() => console.log('server started'));
    server.on('error', (err) => console.log(err));
}

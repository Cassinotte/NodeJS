#!/usr/bin/env node
import app from '../app.js'
import debug from 'debug'

const log = debug('livro_nodejs:www');
app.listen(3000,() => log('server started'));
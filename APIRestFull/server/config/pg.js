import pg from 'pg'
import debug from 'debug'

const log = debug('livro_nodejs:config:pg');

const pool = new pg.Pool({
    user: 'postgres',
    password: 'aquarius',
    host: 'localhost',
    port: 5432,
    database: 'livro_nodejs'
});

pool.on('error', (err) => log('postgres err', err));

export default pool;
require('dotenv').config();

const controller = require('./controller/Stormtrooper');
const verifyId = require('./hook/verifyId');
const fastify = require('fastify')();

fastify.get('/troopers', controller.list);
fastify.post('/troppers', controller.create);

fastify.get('/troopers/:id', {
    onRequest: verifyId,
    handler: controller.byId
});

fastify.put('/troopers/:id', {
    onRequest: verifyId,
    handler: controller.updateById
});

fastify.delete('/troopers/:id', {
    onRequest: verifyId,
    handler: controller.deleteById
});

module.exports = fastify;

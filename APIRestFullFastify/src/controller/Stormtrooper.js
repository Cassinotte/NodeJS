const repository = require('../repository/Stormtrooper');
const createError = require('http-errors');
const { byId, deleteById } = require('../repository/Stormtrooper');

const Stormtrooper = {

    async list(request, reply) {

        const result = await repository.list();
        reply.type('application/json').code(200);
        return result;

    },
    async byId(request, reply) {
        const result = await repository.byId(request.params.id);
        if(!result) throw createError(404, 'trooper not found');

        reply.type('application/json').code(200);
        return result;
    },
    async Create(request, reply) {
        const result = await repository.create(request.body);
        reply.type('application/json').code(201);
        return result;
    },
    async updateById(request, reply) {
        const result = await repository.updateById(request.params.id, request.body);
        reply.type('application/json').code(200);
        return result;
    },
    async deleteById(request, reply) {
        const result = await repository.deleteById(request.params.id);
        reply.type('application/json').code(204)
    }
}

module.exports = Stormtrooper;
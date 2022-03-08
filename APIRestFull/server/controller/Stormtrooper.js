import repository from '../repository/Stormtrooper.js'
import createError from 'http-errors'
import { response } from 'express';

const handleNotFound = (result) => {
    if(!result) {
        throw createError(404, 'trooper not found');
    }

    return result;
}


const Stormtrooper = {

    list(request, response, next) {
        
        const { q, page } = request.query;

        repository.list(q,page)
            .then(result => response.json(result))
            .catch(next);
    },
    byId(request, response, next) { 

        const id = request.params.id;
        if(!/[0-9a-f]{24}/.test(id))
            return next(createError(422, 'invalid id'));

        repository.byId(id)
            .then(handleNotFound)
            .then(result => response.json(result))
            .catch(next);


    },
    async byId2(request, response, next) {
        
        const id = request.params.id;
      
        try
        {
            const result = await repository.byId(id)
                .then(handleNotFound);

            response.json(result);
        }
        catch(e) {
            next(e);
        }
      },
    create(request, response, next) {

        repository.create(request.body)
            .then(result => response.status(201).json(result))
            .catch(next);

    },
    updateById(request, response, next) {

        repository.updateById(request.params.id, request.body)
            .then(result => response.json(result))
            .catch(next)

    },
    deleteById(request, response, next) {

        repository.deleteById(request.params.id)
        .then(_ => response.sendStatus(204))
        .catch(next);
    }

};

export default Stormtrooper;
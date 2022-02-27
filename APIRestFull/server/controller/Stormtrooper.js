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
        repository.list()
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
        if(!/[0-9a-f]{24}/.test(id))
            return next(createError(422, 'invalid id'));

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
    create(request, response, next) { },
    updateById(request, response, next) {},
    deleteById(request, response, next) {}

};

export default Stormtrooper;
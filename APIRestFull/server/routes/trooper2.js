import { Router } from "express";
import controller from '../controller/Stormtrooper2.js'

const trooperRoutes2 = new Router();

const verifyId = (request, response, next) => {
    const id = request.params.id
    if (!/^[0-9a-f]{24}$/.test(id)) {
      return next(createError(422, 'invalid id'))
    }
    next();
  }
  
  trooperRoutes2.get('/', controller.list)
  trooperRoutes2.get('/:id', verifyId, controller.byId2)
  trooperRoutes2.post('/', controller.create)
  trooperRoutes2.put('/:id', verifyId, controller.updateById)
  trooperRoutes2.delete('/:id', verifyId, controller.deleteById)

export default trooperRoutes2;
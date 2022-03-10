import { Router } from "express";
import controller from '../controller/Stormtrooper3.js'
import createError from 'http-errors'


const trooperRoutes3 = new Router();

const verifyId = (request, response, next) => {
    const id = request.params.id
    if (!/^[0-9a-f]{24}$/.test(id)) {
      return next(createError(422, 'invalid id'))
    }
    next();
  }
  
  trooperRoutes3.get('/', controller.list)
  trooperRoutes3.get('/:id', verifyId, controller.byId2)
  trooperRoutes3.post('/', controller.create)
  trooperRoutes3.put('/:id', verifyId, controller.updateById)
  trooperRoutes3.delete('/:id', verifyId, controller.deleteById)

export default trooperRoutes3;
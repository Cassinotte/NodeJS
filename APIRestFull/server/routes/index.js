import { Router } from "express";

import passport from 'passport'
import { BasicStrategy } from "passport-http";

import trooperRoutes from "./trooper.js";
import trooperRoutes2 from "./trooper2.js";
import trooperRoutes3 from "./trooper3.js";

import jwt from 'jwt-simple'
import moment from "moment"
import config from "config"
import createError from "http-errors";

import { verifyJWT } from '../middleware/jwttoken.js'

const routes = new Router();
routes.use(passport.initialize());

passport.use(
    new BasicStrategy((username, password, done) => {
       
        if(username.valueOf() === 'rebels' && password.valueOf() === '1138') {
            return done(null, true);
        }
            
        return done(null, false);
        

    })
)

routes.post('/login', (request, response, next) => {
    const { username, password } = request.body;

    if(username == 'rebels' && password === '1138') {

        const token = jwt.encode({
            user: username,
            exp: moment().add(7, 'days').valueOf()  
        }, config.get('jwtTokenSecret') );

        return response.json({ token });

    }

    next(createError(401, 'Unauthorized'));

});

routes.use('/troopers', passport.authenticate('basic', { session: false }),  trooperRoutes);
routes.use('/troopers2',verifyJWT,  trooperRoutes2);
routes.use('/troopers3', trooperRoutes3);

export default routes;
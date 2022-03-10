import { Router } from "express";

import passport from 'passport'
import { BasicStrategy } from "passport-http";

import trooperRoutes from "./trooper.js";
import trooperRoutes2 from "./trooper2.js";
import trooperRoutes3 from "./trooper3.js";

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

    
})

routes.use('/troopers', passport.authenticate('basic', { session: false }),  trooperRoutes);
routes.use('/troopers2', trooperRoutes2);
routes.use('/troopers3', trooperRoutes3);

export default routes;
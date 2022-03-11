import createError from "http-errors";
import jwt from 'jwt-simple'
import moment from "moment"

import config from 'config'

export const verifyJWT = (request, response, next) => {
    
    const token = request.query.token || request.headers['x-token'];

    if(!token) {
        return next(createError(401, 'Unauthorized'));
    }

    try
    {
        const decoded = jwt.decode(token, config.get('jwtTokenSecret'));
        const isExpired = moment(decoded.exp).isBefore(new Date());

        if(isExpired) {
            next(createError(401, 'Unauthorized'));
        }
        else {
            request.user = decoded.user;
            next();
        }
        
    }
    catch(err) {
        err.status = 401;
        return next(err);
    }

}

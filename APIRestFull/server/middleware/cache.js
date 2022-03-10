import { getAsync, setAsync } from "../config/redis.js";

export const fromCache = (request, response, next) => {
    getAsync(`trooper:${request.params.id}`)
      .then(result => {
        if (!result) return next()
        response.send(JSON.parse(result))
      })
      .catch(_ => next())
  }

export const setCache = (id ,result) => {

    const SIX_MINUTES = 60 * 6;

    setAsync(`trooper:${id}`, JSON.stringify(result), 'EX', SIX_MINUTES);

}


import db from '../config/mongoist.js'

const Stormtrooper = {
    list() {
        const query = {}
        return db.stormtroopers.find(query)
    }
};

export default Stormtrooper;
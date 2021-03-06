import db from '../config/pg.js'
import { setCache } from '../middleware/cache.js'

const sql = `SELECT st.id, st.name, st.nickname, p.name as patent
             FROM STORMTROOPERS st
             JOIN patents p ON p.id = st.id_patent`;


const Stormtrooper3 = {
    list() {

        return db.query(sql)
         .then(result => result.rows);

    },
    byId(id) {
      return db.query(`${sql} WHERE st.id = $1::int`, [id])
         .then(result => result.rows && result.rows[0])
         .then(result => {
            setCache(id,result);
            return result;
         })
    },
    create(data) {
       const sql = `INSERT INTO stormtroopers (name, nickname, id_patent) values ($1::text, $2::text, $3::int) RETURNING id`

       const params = [data.name, data.nickname, data.id_patent];
       return db.query(sql, params)
         .then(result => this.byId(result.rows[0].id));

    },
    updateById(id, data) {
       const sql = `UPDATE stormtroopers SET
                    name = $1::text,
                    nickname = $2::text
                    id_patent = $3::int
                    WHERE id = $4::int`;
        const params = [data.name, data.nickname, data.id_patent, id];

        return db.query(sql,params); 

    },
    deleteById(id) {
       return db.query(`DELETE FROM stormtroopers WHERE id = $1::int`, [id]);
    }, 
};

export default Stormtrooper3;
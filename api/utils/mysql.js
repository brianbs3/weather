const knex = require('../config/knex');

const getPicoReadings = async (date) => {
    return new Promise(async (resolve, reject) => {
        try{
            const m = await knex.select()
            .from('pico')
            .whereRaw('updated > ?', date)
            resolve(m);
        }
        catch(error){
            console.log(error);
        }
    });
}

module.exports = {
    getPicoReadings
};
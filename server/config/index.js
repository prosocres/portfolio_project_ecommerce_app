const Pool = require('pg').Pool
const pool = new Pool({
    user: 'deltaswift',
    host: 'localhost',
    database: 'codecad_ecomm_proj_1',
    password: '',
    port: 63333,
})

module.exports = {
    pool
}
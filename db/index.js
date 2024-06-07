import pg from 'pg'
const { Pool } = pg
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'portfolio_project_ecommerce_app_db',
    password: 'password',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getCustomers = (request, response) => {
    pool.query('SELECT * FROM customers ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

export const query = (text, params, callback) => {
    return pool.query(text, params, callback)
}

module.exports = {
    getCustomers,
}
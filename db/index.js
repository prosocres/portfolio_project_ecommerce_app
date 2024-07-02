const Pool = require('pg').Pool
const pool = new Pool({
    user: 'deltaswift',
    host: 'localhost',
    database: 'codecad_ecomm_proj_1',
    password: '',
    port: 63333,
})

const getCustomers = (request, response) => {
    pool.query('SELECT * FROM customers ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getCustomerById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const createCustomer = (request, response) => {
    const { id, first_name, last_name, email } = request.body
  
    pool.query('INSERT INTO customers (id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *', [id, first_name, last_name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Customer added with ID: ${results.rows[0].id}`)
    })
}

module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer
}
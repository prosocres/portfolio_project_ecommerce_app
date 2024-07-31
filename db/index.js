const Pool = require('pg').Pool
const pool = new Pool({
    user: 'deltaswift',
    host: 'localhost',
    database: 'codecad_ecomm_proj_1',
    password: '',
    port: 63333,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateUser = (request, response) => {
    const {id, first_name, last_name, email} = request.body  

    const text = `UPDATE users SET first_name=$2, last_name=$3, email=$4 WHERE id=$1 RETURNING *`
    const values = [id, first_name, last_name, email]
  
    pool.query(text, values, (error, results) => {
      if(error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = async ({email, first_name, last_name, pwd_hash, user_role}) => {
    const text = `INSERT INTO users (email, first_name, last_name, pwd_hash) VALUES ($1, $2, $3, $4) RETURNING *`
    const values = [email, first_name, last_name, pwd_hash, user_role]

    await pool.query(text, values, (error, response) => {
      if(error) {
        throw error
      }
    response.status(201).send(`User added with ID: ${response.rows[0].id}`)
    })
  }


const deleteUser = ""

const getProducts = ""

const getCarts = ""

const getOrders = ""

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    createUser
}
const { response } = require('express')
const { pool } = require('../config')


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
    const text = `INSERT INTO users (email, first_name, last_name, pwd_hash, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const values = [email, first_name, last_name, pwd_hash, user_role]

    const res = await pool.query(text, values)
    console.log(res.rows[0])
    return res.rows[0]
}

const fetchUserByEmailDb = async (email) => {
  const res = await pool.query(`SELECT users.id, email, carts.id AS cart_id, pwd_hash, user_role, active
                                FROM users INNER JOIN carts ON users.id = carts.user_id WHERE email = $1 AND active = true`, [email])
  return res.rows[0]
}

const deleteUser = ""

const getProducts = ""

const getCarts = ""

const getOrders = ""

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    createUser,
    fetchUserByEmailDb
}
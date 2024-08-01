const { createUserDb, fetchUserByEmailDb } = require('../db')

const createUser = async (user) => {
    return await createUserDb(user)
}

const fetchUserByEmail = async (email) => {
    return await fetchUserByEmailDb(email)
}

module.exports = {
    createUser,
    fetchUserByEmail
}
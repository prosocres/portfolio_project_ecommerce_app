const {fetchUserByEmailDb} = require('../db/users.db')

const fetchUserByEmail = async (email) => {
    return await fetchUserByEmailDb(email)
}

module.exports = {
    fetchUserByEmail
}
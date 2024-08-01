const {fetchUserByEmailDb} = require('./index')

const fetchUserByEmail = async (email) => {
    return await fetchUserByEmailDb(email)
}

module.exports = {
    fetchUserByEmail
}
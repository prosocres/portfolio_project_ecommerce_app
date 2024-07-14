const bcrypt = require('bcrypt')
const {createUser} = require('./index.js')


const getPwdHash = async (pwd) => {
      const hash = await bcrypt.hash(pwd, 10)
      return(hash) 
}

const signupUser = async (req, res, next) => {

    const { email, password, first_name, last_name} = req.body
      //Check if active user with this email exists
      //const userDb = await fetchUserByEmail(email)
      //if (userDb?.active === true) {
      //  return res.status(403).send("User with this email already exists.")
      //}

      const pwd_hash = await getPwdHash(password)
      const user = {
        email,
        first_name,
        last_name,
        pwd_hash,
        user_role: "customer"
      }

      const newUser = await createUser(user)
      const newCart = await createCart(newUser.id)
      res.status(201).json({userId: newUser.id, cartId: newCart.id})
      next()
}

module.exports = {
    signupUser
}
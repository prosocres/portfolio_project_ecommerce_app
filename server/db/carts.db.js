const {pool} = require('../config')

//Fetches all products in a cart for a userId
const fetchCartByIdDb = async (userId) => {

    const res = await pool.query(
      ` SELECT products.id, name, price, description, category, image_url, status, quantity FROM carts
        INNER JOIN cart_products ON carts.id = cart_products.cart_id
        INNER JOIN products ON cart_products.product_id = products.id
        WHERE user_id = $1`, [userId])
    return res.rows
}

//Creates a record in the carts table for a userId with 1-1 relation
const createCartDb = async (userId) => {
  const text = `INSERT INTO carts(user_id)
                VALUES($1) RETURNING id`
  const values = [userId]

    const res = await pool.query(text, values)
    return res.rows[0]
}
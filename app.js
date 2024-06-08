const express = require('express')
const app = express()
const db = require('./db/index.js')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! I\'m an node-express app')
})

app.get('/')

app.get('/customers', db.getCustomers)
app.get('/customers/:id', db.getCustomerById)
app.post('/customers', db.createCustomer)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
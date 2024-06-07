const express = require('express')
const app = express()
const db = require('./db/index')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/')

app.get('/customers', db.getCustomers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db/index.js')
const port = 3000
const {signupUser} = require('auth-controller')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.send('Hello World! I\'m an node-express app')
})

app.get('/')

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.put('/user/:id', db.updateUser)
app.post('/users', db.createUser)
//app.post('/auth/signup', )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
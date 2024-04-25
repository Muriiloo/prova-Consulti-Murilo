
const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./db')
const router = express.Router()
const cors = require('cors')
const app = express()
const port = 3000
const rotas = require('./rotas')

app.use(cors())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router);

app.use(rotas)

app.listen(port, () => {
  console.log(`Server esta rodando em http://localhost:${port}`)
})

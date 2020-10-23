const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8081

app.use(bodyParser.json())
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
)

app.get('/', (request, response) => {
   response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
   console.log(`App running on port ${port}.`)
})

const db = require('./queries')
app.get('/points', db.getPoints) //http://localhost:8081/points
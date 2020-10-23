const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'gisdb',
    password: 'postgres',
    port: 5432,
})

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))

const getPoints = (request, response) => {
    client.query('select id, ST_X (ST_Transform (geom, 4326)) AS long, ST_Y (ST_Transform (geom, 4326)) AS lat FROM points', (err, res) => {
        if (err) throw err
        response.json(res.rows);
      })
}

module.exports = {
    getPoints
}
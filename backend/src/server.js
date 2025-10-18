import express from 'express'

import pool from './database/connection.js'

// Rotas
import routes from './routes/index.js'

const app = express()
const port = 3000

app.use(express.json())
routes.attach(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
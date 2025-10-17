import express from 'express'

import pool from './database/connection.js'

// Rotas
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/', userRoutes)
app.use('', authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
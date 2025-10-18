import dotenv from 'dotenv'
dotenv.config()

export default {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE_NAME || "dbEmprestimoLivro",
    connectionLimit: 10,
}
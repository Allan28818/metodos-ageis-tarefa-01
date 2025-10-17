import mysql from 'mysql2/promise'
import dbConfig from '../config/database.js'

const pool = mysql.createPool(dbConfig)

try {
    const connection = await pool.getConnection()
    console.log("[SUCCESS] Teste de conexão ao banco de dados foi concluido")
    connection.release()
} catch (error) {
    console.log("[ERROR] Erro ao conectar no banco de dados: ", error.message)
    throw error
}

export default pool
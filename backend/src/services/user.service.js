import pool from '../database/connection.js'
import bcrypt from 'bcrypt'
class UserService{
    getByEmail = async (email) => {
        const query = 'SELECT id_usuario, email, senha_usuario FROM usuario WHERE email = ?'
        const [result] = await pool.query(query, [email])
        return result
    }

    create = async (user) => {
        const query = 'INSERT INTO usuario (nome, senha_usuario, email, telefone) VALUES (?)'
        const senha_criptografada = await bcrypt.hash(user.senha, 10)
        const arrUser = [user.nome, senha_criptografada, user.email, user.telefone]
        const [result] = await pool.query(query, [arrUser])
        return result
    }
}

const userService = new UserService()
export default userService
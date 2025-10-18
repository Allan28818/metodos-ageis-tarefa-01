import pool from '../database/connection.js'

class UserService{
    getByEmail = async (email) => {
        const query = 'SELECT matricula, email, senha_usuario FROM usuario WHERE email = ?'
        const [result] = await pool.query(query, [email])
        return result
    }
}

const userService = new UserService()
export default userService
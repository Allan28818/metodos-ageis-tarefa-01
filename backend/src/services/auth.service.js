import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'

class AuthService{
    generateToken = async (id) => {
        return jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 })
    }
}

const authService = new AuthService()
export default authService
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class AuthService{
    generateToken = async (id) => {
        return jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 })
    }
}

const authService = new AuthService()
export default authService
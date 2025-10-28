import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthService {
  generateToken(id) {
    const secret = process.env.SECRET_JWT || 'your-secret-key';
    return jwt.sign({ id: id }, secret, { expiresIn: 86400 });
  }

  async verifyPassword(inputPassword, userPassword) {
    const passwordIsValid = await bcrypt.compare(inputPassword, userPassword);
    return passwordIsValid;
  }
}

const authService = new AuthService();

export { authService, jwt, bcrypt };

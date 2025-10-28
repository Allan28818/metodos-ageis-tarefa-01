import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
  generateToken = async (id) => {
    return jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });
  };

  verifyPassword = async (inputPassword, userPassword) => {
    const passwordIsValid = await bcrypt.compare(inputPassword, userPassword);
    return passwordIsValid;
  };
}

const authService = new AuthService();
export default authService;

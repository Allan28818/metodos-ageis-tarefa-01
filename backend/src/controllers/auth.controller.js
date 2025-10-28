import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";

const login = async (req, res) => {
  try {
    const { email, senha: password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    const result = (await userService.getByEmail(email))[0];

    if (!result) {
      return res.status(401).send({ message: "Email invalido" });
    }

    const passwordIsValid = await authService.verifyPassword(
      password,
      result.senha_usuario
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Senha invalida" });
    }

    if (!result.id_usuario) {
      return res.status(401).send({ message: "Erro na identificação" });
    }
    const token = await authService.generateToken(result.id_usuario);

    res.status(200).json({ token });
  } catch (erro) {
    console.log(erro);
    res.status(400).json({ message: "Erro na tentativa do login" });
  }
};

export { login };

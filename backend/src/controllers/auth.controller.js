import authService from '../services/auth.service.js'
import userService from '../services/user.service.js'

const login = async (req, res) => {
    const { email, password } = req.body || {}
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' })
    }

    const result = (await userService.getByEmail(email))[0]

    if(!result){
        return res.status(401).send({ message: "Email invalido" })
    }

    const passwordIsValid = result.password === password // tirar apos inserção de criptografia na senha
    // const passwordIsValid = await authService.verifyPassword(password, result.password) Adicionar apos a inserção de criptografia na senha

    if(!passwordIsValid){
        return res.status(401).send({ message: "Senha invalida" })
    }

    if(!result.id){
        return res.status(401).send({ message: "Erro na identificação" })
    }
    const token = await authService.generateToken(result.id)
    
    res.status(200).json({ token })
}

export { login }
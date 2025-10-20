import userService from "../services/user.service.js";

const register = async (req, res) => { 
    const { nome, email, senha, matricula, telefone} = req.body; 

    if (!nome || !email || !senha || !telefone ) {
        return res.status(400).json({ erro: 'Dados inválidos' })
    }
    const user = {
        nome, email, senha, matricula, telefone
    }

    const result = await userService.create(user)
    console.log(result);
    res.status(201).json({ message: 'Usuario criado'})
}
export {register}
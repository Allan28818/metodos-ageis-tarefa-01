class UserService{
    getByEmail = async (email) => {
        if(email != "teste@a.ucb.br"){
            return []
        }
        return [{
            id: 1,
            email: 'teste@a.ucb.br',
            password: '123456'
        }, {}]
    }
}

const userService = new UserService()
export default userService
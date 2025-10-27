// Funções para gerenciar localStorage
export const storageHelper = {
  // Salvar usuários
  saveUser: (userData) => {
    const users = storageHelper.getUsers();
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
  },
  
  // Buscar todos os usuários
  getUsers: () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  },
  
  // Verificar se usuário existe
  existsUser: (email, ra) => {
    const users = storageHelper.getUsers();
    return users.find(user => user.email === email && user.ra === ra);
  },

  login(email, password) {
    const users = storageHelper.getUsers();
    return users.find(user => user.email === email && user.password === password);
  },
  
  // Salvar sessão do usuário logado
  saveSession: (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  },
  
  // Buscar usuário logado
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },
  
  // Fazer logout
  logout: () => {
    localStorage.removeItem('currentUser');
  }
};
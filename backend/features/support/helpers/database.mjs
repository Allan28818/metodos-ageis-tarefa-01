import mysql from 'mysql2/promise';

class DatabaseHelper {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE_NAME || 'dbEmprestimoLivro'
      });
    }
    return this.connection;
  }

  async getUserByEmail(email) {
    const conn = await this.connect();
    const [rows] = await conn.execute(
      'SELECT id_usuario, email, senha_usuario, nome, telefone FROM usuario WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  async deleteUserByEmail(email) {
    const conn = await this.connect();
    await conn.execute('DELETE FROM usuario WHERE email = ?', [email]);
  }

  async createUser(userData) {
    const conn = await this.connect();
    const [result] = await conn.execute(
      'INSERT INTO usuario (nome, senha_usuario, email, telefone) VALUES (?, ?, ?, ?)',
      [userData.nome, userData.senha_usuario, userData.email, userData.telefone]
    );
    return result.insertId;
  }

  async clearTestUsers() {
    const conn = await this.connect();
    await conn.execute(
      "DELETE FROM usuario WHERE email LIKE '%@email.com' OR email LIKE '%teste%' OR email LIKE '%test%'"
    );
  }

  async close() {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}

export default new DatabaseHelper();

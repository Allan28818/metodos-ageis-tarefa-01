import { Given, When, Then } from "@cucumber/cucumber";
import database from "../support/helpers/database.mjs";
import bcrypt from "bcryptjs";

// DADOS DE USUÁRIO
Given("que eu tenho os seguintes dados de usuário:", function (dataTable) {
  const data = dataTable.rowsHash();
  this.requestData = {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    telefone: data.telefone,
  };

  if (data.matricula) {
    this.requestData.matricula = data.matricula;
  }

  // Guardar email para verificações posteriores
  this.testEmail = data.email;
  this.testPassword = data.senha;
});

Given(
  "que eu tenho dados de usuário completos exceto o campo {string}",
  function (campo) {
    this.requestData = {
      nome: "Teste Usuário",
      email: "teste@email.com",
      senha: "senha123",
      telefone: "11999887766",
    };

    delete this.requestData[campo];
  }
);

Given("que eu tenho dados de usuário sem o campo {string}", function (campo) {
  this.requestData = {
    nome: "Teste Usuário",
    email: "teste@email.com",
    senha: "senha123",
    telefone: "11999887766",
  };

  delete this.requestData[campo];
});

Given("que eu envio os seguintes dados:", function (dataTable) {
  const data = dataTable.rowsHash();
  this.requestData = {
    nome: data.nome || "",
    email: data.email || "",
    senha: data.senha || "",
    telefone: data.telefone || "",
  };
});

// VALIDAÇÕES DE BANCO DE DADOS
Then("o usuário deve estar salvo no banco de dados", async function () {
  const user = await database.getUserByEmail(this.testEmail);
  this.expect(user).to.not.be.undefined;
  this.expect(user.email).to.equal(this.testEmail);
});

Then("a senha deve estar criptografada no banco de dados", async function () {
  const user = await database.getUserByEmail(this.testEmail);
  this.expect(user.senha_usuario).to.not.equal(this.testPassword);
  this.expect(user.senha_usuario).to.match(/^\$2b\$10\$/);
  this.expect(user.senha_usuario).to.have.lengthOf(60);
});

Then(
  "o usuário deve estar salvo no banco de dados com matrícula {string}",
  async function (matricula) {
    const user = await database.getUserByEmail(this.testEmail);
    this.expect(user).to.not.be.undefined;
    this.expect(user.matricula).to.equal(parseInt(matricula));
  }
);

Then("nenhum usuário deve ser criado no banco de dados", async function () {
  if (this.testEmail) {
    const user = await database.getUserByEmail(this.testEmail);
    this.expect(user).to.be.undefined;
  }
});

// VALIDAÇÕES DE CRIPTOGRAFIA
Given(
  "que eu registro um usuário com os seguintes dados:",
  async function (dataTable) {
    const data = dataTable.rowsHash();
    this.requestData = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      telefone: data.telefone,
    };

    this.testEmail = data.email;
    this.testPassword = data.senha;

    try {
      await this.makeRequest("POST", "/api/usuario/register", this.requestData);
    } catch (error) {
      this.response = error.response;
    }
  }
);

When("eu consulto o banco de dados para este usuário", async function () {
  this.dbUser = await database.getUserByEmail(this.testEmail);
});

Then("a senha armazenada não deve ser {string}", function (plainPassword) {
  this.expect(this.dbUser.senha_usuario).to.not.equal(plainPassword);
});

Then("a senha armazenada deve começar com {string}", function (prefix) {
  this.expect(this.dbUser.senha_usuario).to.match(
    new RegExp(`^${prefix.replace("$", "\\$")}`)
  );
});

Then("a senha armazenada deve ter {int} caracteres", function (length) {
  this.expect(this.dbUser.senha_usuario).to.have.lengthOf(length);
});

// VALIDAÇÃO DE SQL INJECTION
Then("o sistema deve tratar a entrada adequadamente", function () {
  // Se chegou aqui sem erro de SQL, o sistema tratou adequadamente
  this.expect(this.response.status).to.be.oneOf([200, 201, 400]);
});

Then("a tabela {string} deve continuar existindo", async function (tableName) {
  const conn = await database.connect();
  const [tables] = await conn.execute("SHOW TABLES");
  const tableExists = tables.some((row) =>
    Object.values(row).includes(tableName)
  );
  this.expect(tableExists).to.be.true;
});

// LIMPEZA
Given("que já existe um usuário com email {string}", async function (email) {
  // Limpar se já existe
  await database.deleteUserByEmail(email);

  // Criar usuário
  const hashedPassword = await bcrypt.hash("senha123", 10);
  await database.createUser({
    nome: "Usuário Existente",
    email: email,
    senha_usuario: hashedPassword,
    telefone: "11999887766",
  });
});

import { Given, When, Then } from "@cucumber/cucumber";
import database from "../support/helpers/database.mjs";

// CONTEXTO COMUM
Given("que a API está rodando em {string}", function (url) {
  this.baseUrl = url;
});

Given("o banco de dados está acessível", async function () {
  await database.connect();
});

// REQUISIÇÕES HTTP
When("eu envio uma requisição POST para {string}", async function (path) {
  try {
    await this.makeRequest("POST", path, this.requestData);
  } catch (error) {
    // Guardar erro para verificações posteriores
    this.response = error.response;
  }
});

Given("que eu não envio nenhum dado no corpo da requisição", function () {
  this.requestData = {};
});

When("eu não envio nenhum dado no corpo da requisição", function () {
  this.requestData = {};
});

When("eu não envio credenciais no corpo da requisição", function () {
  this.requestData = {};
});

When("eu envio uma requisição sem corpo", function () {
  this.requestData = null;
});

// VALIDAÇÕES DE RESPOSTA
Then("o código de resposta deve ser {int}", function (statusCode) {
  this.expect(this.response).to.have.status(statusCode);
});

Then("a resposta deve conter a mensagem {string}", function (message) {
  this.expect(this.response.body).to.have.property("message", message);
});

Then("a resposta deve conter o erro {string}", function (errorMessage) {
  this.expect(this.response.body).to.have.property("erro", errorMessage);
});

Then("a resposta deve ser um JSON", function () {
  this.expect(this.response).to.be.json;
});

Then("deve conter o campo {string}", function (field) {
  this.expect(this.response.body).to.have.property(field);
});

Then("a resposta não deve conter a senha do usuário", function () {
  this.expect(this.response.body).to.not.have.property("senha");
  this.expect(this.response.body).to.not.have.property("senha_usuario");
  this.expect(this.response.body).to.not.have.property("password");
});

// VALIDAÇÕES DE ESTRUTURA
Then("a resposta deve conter apenas o token JWT", function () {
  const keys = Object.keys(this.response.body);
  this.expect(keys).to.have.lengthOf(1);
  this.expect(this.response.body).to.have.property("token");
});

Then("indica que o recurso foi criado", function () {
  this.expect(this.response.status).to.equal(201);
});

Then("indica que a operação foi bem-sucedida", function () {
  this.expect(this.response.status).to.equal(200);
});

Then("indica bad request", function () {
  this.expect(this.response.status).to.equal(400);
});

Then("indica não autorizado", function () {
  this.expect(this.response.status).to.equal(401);
});

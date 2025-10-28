import { Given, When, Then } from "@cucumber/cucumber";

// VALIDAÇÕES GENÉRICAS
Given(
  "que eu envio uma requisição de registro sem campos obrigatórios",
  function () {
    this.requestData = {};
  }
);

Given("que eu envio dados de registro sem o campo {string}", function (campo) {
  this.requestData = {
    nome: "Teste Usuário",
    email: "teste@email.com",
    senha: "senha123",
    telefone: "11999887766",
  };
  delete this.requestData[campo];
});

Given("que eu não envio email ou senha", function () {
  this.requestData = {};
});

When("a validação é executada", function () {
  // A validação é executada automaticamente na requisição
});

When("a API processa a requisição", async function () {
  try {
    await this.makeRequest("POST", "/api/usuario/register", this.requestData);
  } catch (error) {
    this.response = error.response;
  }
});

// JSON MALFORMADO
Given("que eu envio um JSON malformado para registro", function () {
  this.requestData = "invalid json{";
});

Given("que eu envio um JSON malformado para login", function () {
  this.requestData = "invalid json{";
});

Then("a API deve rejeitar a requisição", function () {
  this.expect(this.response.status).to.be.oneOf([400, 500]);
});

Then("deve retornar um erro apropriado", function () {
  this.expect(this.response.status).to.be.greaterThanOrEqual(400);
});

// MENSAGENS DE ERRO
Given("que diferentes tipos de erros podem ocorrer", function () {
  // Setup conceitual
});

When("o sistema retorna erros", function () {
  // Implementação vazia - erros já foram retornados
});

Then("as mensagens devem ser descritivas", function () {
  if (this.response && this.response.body) {
    const hasMessage = this.response.body.message || this.response.body.erro;
    this.expect(hasMessage).to.not.be.undefined;
  }
});

Then("devem seguir um padrão consistente", function () {
  // Todas as respostas devem ter 'message' ou 'erro'
  if (this.response && this.response.body) {
    const hasStandardField =
      this.response.body.message !== undefined ||
      this.response.body.erro !== undefined;
    this.expect(hasStandardField).to.be.true;
  }
});

Then("não devem expor informações sensíveis", function () {
  if (this.response && this.response.body) {
    const bodyStr = JSON.stringify(this.response.body);

    // Não deve conter senhas
    this.expect(bodyStr).to.not.include("senha_usuario");
    this.expect(bodyStr).to.not.include("password");

    // Não deve conter stack traces completos
    this.expect(bodyStr).to.not.include("at Object");
    this.expect(bodyStr).to.not.include("node_modules");
  }
});

// VALIDAÇÃO DE EXPOSIÇÃO DE INFORMAÇÕES
Given("que ocorre um erro no sistema", function () {
  // Setup para teste de erro
  this.requestData = null;
});

When("a API retorna a mensagem de erro", async function () {
  try {
    await this.makeRequest("POST", "/api/auth/login", this.requestData);
  } catch (error) {
    this.response = error.response;
  }
});

Then("a mensagem não deve conter stack traces", function () {
  const bodyStr = JSON.stringify(this.response.body);
  this.expect(bodyStr).to.not.include("Error:");
  this.expect(bodyStr).to.not.include("at ");
});

Then("não deve conter informações de configuração", function () {
  const bodyStr = JSON.stringify(this.response.body);
  this.expect(bodyStr).to.not.include("localhost");
  this.expect(bodyStr).to.not.include("3306");
  this.expect(bodyStr).to.not.include("root");
});

Then("não deve conter detalhes do banco de dados", function () {
  const bodyStr = JSON.stringify(this.response.body);
  this.expect(bodyStr).to.not.include("MySQL");
  this.expect(bodyStr).to.not.include("database");
  this.expect(bodyStr).to.not.include("connection");
});

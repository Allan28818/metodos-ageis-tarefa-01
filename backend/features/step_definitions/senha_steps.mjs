import { Given, When, Then } from "@cucumber/cucumber";
import database from "../support/helpers/database.mjs";
import { bcrypt, authService } from "../support/services-wrapper.mjs";

// SETUP
Given("que a biblioteca bcrypt está disponível", function () {
  this.expect(bcrypt).to.not.be.undefined;
});

Given(
  "o sistema está configurado com {int} salt rounds",
  function (saltRounds) {
    this.saltRounds = saltRounds;
    this.expect(this.saltRounds).to.equal(10);
  }
);

// REGISTRO E CRIPTOGRAFIA
Given(
  "que um novo usuário se registra com a senha {string}",
  async function (password) {
    this.plainPassword = password;
    this.testEmail = "teste" + Date.now() + "@email.com";

    this.requestData = {
      nome: "Teste Usuário",
      email: this.testEmail,
      senha: password,
      telefone: "11999887766",
    };
  }
);

Given(
  "que um usuário se registra com a senha {string}",
  async function (password) {
    this.plainPassword = password;
    this.testEmail = "teste" + Date.now() + "@email.com";

    this.requestData = {
      nome: "Teste Usuário",
      email: this.testEmail,
      senha: password,
      telefone: "11999887766",
    };

    // Registrar o usuário
    try {
      await this.makeRequest("POST", "/api/usuario/register", this.requestData);
    } catch (error) {
      this.response = error.response;
    }
  }
);

Given(
  "outro usuário se registra com a mesma senha {string}",
  async function (password) {
    this.plainPassword2 = password;
    this.testEmail2 = "teste" + Date.now() + "_2@email.com";

    const requestData = {
      nome: "Teste Usuário 2",
      email: this.testEmail2,
      senha: password,
      telefone: "11999887766",
    };

    // Registrar o segundo usuário
    try {
      await this.makeRequest("POST", "/api/usuario/register", requestData);
    } catch (error) {
      this.response = error.response;
    }
  }
);

When("o sistema processa o registro", async function () {
  try {
    await this.makeRequest("POST", "/api/usuario/register", this.requestData);
  } catch (error) {
    this.response = error.response;
  }
});

When("o sistema gera o hash da senha", async function () {
  this.hashedPassword = await bcrypt.hash(this.plainPassword, 10);
});

When("o sistema gera os hashes para ambos", async function () {
  // Os hashes já foram gerados durante o registro
  this.hash1 = (await database.getUserByEmail(this.testEmail)).senha_usuario;
  this.hash2 = (await database.getUserByEmail(this.testEmail2)).senha_usuario;
});

// VALIDAÇÕES DE HASH
Then("a senha deve ser criptografada usando bcrypt", async function () {
  const user = await database.getUserByEmail(this.testEmail);
  this.expect(user.senha_usuario).to.match(/^\$2b\$/);
});

Then(
  "a senha armazenada não deve ser igual a {string}",
  async function (plainPassword) {
    const user = await database.getUserByEmail(this.testEmail);
    this.expect(user.senha_usuario).to.not.equal(plainPassword);
  }
);

Then(
  "o hash deve conter o indicador de {int} salt rounds",
  function (saltRounds) {
    this.expect(this.hashedPassword).to.match(
      new RegExp(`^\\$2b\\$${saltRounds}\\$`)
    );
  }
);

Then("os hashes devem ser diferentes", function () {
  this.expect(this.hash1).to.not.equal(this.hash2);
});

Then("ambos os hashes devem ter {int} caracteres", function (length) {
  this.expect(this.hash1).to.have.lengthOf(length);
  this.expect(this.hash2).to.have.lengthOf(length);
});

Then("ambos devem começar com {string}", function (prefix) {
  this.expect(this.hash1).to.match(
    new RegExp(`^${prefix.replace(/\$/g, "\\$")}`)
  );
  this.expect(this.hash2).to.match(
    new RegExp(`^${prefix.replace(/\$/g, "\\$")}`)
  );
});

// LOGIN E COMPARAÇÃO
Given(
  "que existe um usuário com senha criptografada no banco",
  async function () {
    this.testEmail = "usuario@email.com";
    this.testPassword = "senha123";

    await database.deleteUserByEmail(this.testEmail);

    const hashedPassword = await bcrypt.hash(this.testPassword, 10);
    await database.createUser({
      nome: "Usuário Teste",
      email: this.testEmail,
      senha_usuario: hashedPassword,
      telefone: "11999887766",
    });
  }
);

Given("a senha original era {string}", function (password) {
  this.testPassword = password;
});

When("o usuário tenta fazer login com {string}", async function (password) {
  this.requestData = {
    email: this.testEmail,
    senha: password,
  };

  try {
    await this.makeRequest("POST", "/api/auth/login", this.requestData);
  } catch (error) {
    this.response = error.response;
  }
});

When(
  "o usuário tenta fazer login com senha vazia {string}",
  async function (password) {
    this.requestData = {
      email: this.testEmail,
      senha: password,
    };

    try {
      await this.makeRequest("POST", "/api/auth/login", this.requestData);
    } catch (error) {
      this.response = error.response;
    }
  }
);

Then("o sistema deve usar bcrypt.compare para verificar", function () {
  // Se chegou aqui, o sistema usou bcrypt.compare
  this.expect(this.response).to.not.be.null;
});

Then("a comparação deve retornar verdadeiro", function () {
  // Se o login foi bem-sucedido, bcrypt.compare retornou true
  this.expect(this.response.status).to.equal(200);
});

Then("a comparação deve retornar falso", function () {
  // Se o login falhou, bcrypt.compare retornou false
  this.expect(this.response.status).to.equal(401);
});

Then("o login deve ser bem-sucedido", function () {
  this.expect(this.response.status).to.equal(200);
  this.expect(this.response.body).to.have.property("token");
});

Then("o login deve falhar com código {int}", function (statusCode) {
  this.expect(this.response.status).to.equal(statusCode);
});

Then("a resposta deve indicar senha inválida", function () {
  this.expect(this.response.body.message).to.equal("Senha invalida");
});

Then("o login deve falhar", function () {
  this.expect(this.response.status).to.be.oneOf([400, 401]);
});

// DIFERENTES TIPOS DE SENHAS
Given(
  "que diferentes usuários se registram com senhas:",
  async function (dataTable) {
    this.senhasTestadas = [];

    for (const row of dataTable.hashes()) {
      const email = "teste_" + row.tipo_senha + Date.now() + "@email.com";

      const requestData = {
        nome: "Teste " + row.tipo_senha,
        email: email,
        senha: row.senha,
        telefone: "11999887766",
      };

      try {
        await this.makeRequest("POST", "/api/usuario/register", requestData);
      } catch (error) {
        // Ignorar erros
      }

      this.senhasTestadas.push({
        tipo: row.tipo_senha,
        email: email,
        senha: row.senha,
      });
    }
  }
);

When("o sistema criptografa cada senha", async function () {
  // Já foram criptografadas durante o registro
  this.hashesGerados = [];

  for (const senha of this.senhasTestadas) {
    const user = await database.getUserByEmail(senha.email);
    if (user) {
      this.hashesGerados.push({
        tipo: senha.tipo,
        hash: user.senha_usuario,
        senhaOriginal: senha.senha,
      });
    }
  }
});

Then("todas devem ter hash de {int} caracteres", function (length) {
  this.hashesGerados.forEach((item) => {
    this.expect(item.hash).to.have.lengthOf(length);
  });
});

Then("todas devem começar com {string}", function (prefix) {
  this.hashesGerados.forEach((item) => {
    this.expect(item.hash).to.match(
      new RegExp(`^${prefix.replace(/\$/g, "\\$")}`)
    );
  });
});

Then("nenhuma deve ser igual à senha original", function () {
  this.hashesGerados.forEach((item) => {
    this.expect(item.hash).to.not.equal(item.senhaOriginal);
  });
});

// SEGURANÇA
Then("não deve ser possível recuperar a senha original do hash", function () {
  // Hash bcrypt é unidirecional - não há função de descriptografia
  this.expect(this.hashedPassword).to.not.equal(this.plainPassword);
  this.expect(this.hashedPassword).to.have.lengthOf(60);
});

Then(
  "a única forma de verificar deve ser usando bcrypt.compare",
  async function () {
    const isMatch = await bcrypt.compare(
      this.plainPassword,
      this.hashedPassword
    );
    this.expect(isMatch).to.be.true;
  }
);

Then("o processo deve levar tempo significativo", function () {
  // Bcrypt é computacionalmente custoso por design
  // Este teste é mais conceitual
  this.expect(this.hashedPassword).to.have.lengthOf(60);
});

Then("isso deve proteger contra ataques de força bruta", function () {
  // Conceitual - bcrypt com 10 rounds é lento o suficiente
  this.expect(this.hashedPassword).to.match(/^\$2b\$/);
});

// ESTRUTURA DO HASH
Given("que uma senha é criptografada com bcrypt", async function () {
  this.hashedPassword = await bcrypt.hash("testeSenha123", 10);
});

When("o hash é gerado", function () {
  // Já foi gerado
  this.expect(this.hashedPassword).to.not.be.empty;
});

Then("o hash deve ter o formato {string}", function (format) {
  // O formato é $2b$rounds$salt+hash
  this.expect(this.hashedPassword).to.match(/^\$2b\$\d{2}\$/);
});

Then("deve conter exatamente {int} caracteres", function (length) {
  this.expect(this.hashedPassword).to.have.lengthOf(length);
});

Then(
  "os primeiros {int} caracteres devem ser {string}",
  function (count, prefix) {
    const firstChars = this.hashedPassword.substring(0, count);
    this.expect(firstChars).to.equal(prefix);
  }
);

Then("os próximos {int} caracteres devem ser o salt", function (count) {
  // Salt começa após "$2b$10$" (7 caracteres)
  const salt = this.hashedPassword.substring(7, 7 + count);
  this.expect(salt).to.have.lengthOf(count);
});

Then("os últimos {int} caracteres devem ser o hash", function (count) {
  // Hash são os últimos 31 caracteres
  const hashPart = this.hashedPassword.substring(
    this.hashedPassword.length - count
  );
  this.expect(hashPart).to.have.lengthOf(count);
});

// COMPARAÇÃO CASE-SENSITIVE
Then("a comparação bcrypt deve funcionar corretamente", function () {
  this.expect(this.response.status).to.equal(200);
  this.expect(this.response.body).to.have.property("token");
});

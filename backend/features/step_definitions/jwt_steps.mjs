import { Given, When, Then } from '@cucumber/cucumber';
import { jwt, authService } from '../support/services-wrapper.mjs';
import bcrypt from 'bcryptjs';
import database from '../support/helpers/database.mjs';

// SETUP
Given('que o sistema está configurado com SECRET_JWT', function () {
  this.secret = process.env.SECRET_JWT || 'your-secret-key';
  this.expect(this.secret).to.not.be.empty;
});

Given('a biblioteca jsonwebtoken está disponível', function () {
  this.expect(jwt).to.not.be.undefined;
});

// GERAÇÃO DE TOKEN
Given('que existe um usuário com id {string}', function (userId) {
  this.userId = userId;
});

Given('existe outro usuário com id {string}', function (userId) {
  this.otherUserId = userId;
});

When('o sistema gera um token JWT para este usuário', function () {
  this.token = authService.generateToken(this.userId);
});

When('o sistema gera um token JWT para o primeiro usuário', function () {
  this.token1 = authService.generateToken(this.userId);
});

When('o sistema gera um token JWT para o segundo usuário', function () {
  this.token2 = authService.generateToken(this.otherUserId);
});

When('o sistema gera um token JWT para este usuário no momento T1', function () {
  this.token1 = authService.generateToken(this.userId);
  this.timestamp1 = Date.now();
});

When('o sistema gera outro token JWT para o mesmo usuário no momento T2', async function () {
  // Esperar 1 segundo para garantir timestamp diferente
  await new Promise(resolve => setTimeout(resolve, 1000));
  this.token2 = authService.generateToken(this.userId);
  this.timestamp2 = Date.now();
});

// VALIDAÇÕES DE TOKEN
Then('o token deve ser gerado com sucesso', function () {
  this.expect(this.token).to.be.a('string');
  this.expect(this.token).to.not.be.empty;
});

Then('o token não deve estar vazio', function () {
  this.expect(this.token).to.not.be.empty;
  this.expect(this.token.length).to.be.greaterThan(0);
});

Then('o token deve conter o payload com id {string}', function (userId) {
  const decoded = jwt.decode(this.token);
  this.expect(decoded.id).to.equal(userId);
});

Then('o token deve conter um campo de expiração', function () {
  const decoded = jwt.decode(this.token);
  this.expect(decoded).to.have.property('exp');
});

Then('o tempo de expiração deve ser de {int} segundos', function (seconds) {
  const decoded = jwt.decode(this.token);
  const expectedExp = decoded.iat + seconds;
  this.expect(decoded.exp).to.equal(expectedExp);
});

Then('o tempo de expiração deve ser equivalente a {int} horas', function (hours) {
  const decoded = jwt.decode(this.token);
  const expectedExp = decoded.iat + (hours * 60 * 60);
  this.expect(decoded.exp).to.equal(expectedExp);
});

// ASSINATURA
Given('o SECRET_JWT está configurado', function () {
  this.secret = process.env.SECRET_JWT || 'your-secret-key';
  this.expect(this.secret).to.not.be.empty;
});

Then('o token deve estar assinado com o SECRET_JWT', function () {
  const secret = process.env.SECRET_JWT || 'your-secret-key';

  // Tentar verificar o token com o secret
  const isValid = () => {
    try {
      jwt.verify(this.token, secret);
      return true;
    } catch (error) {
      return false;
    }
  };

  this.expect(isValid()).to.be.true;
});

Then('o token deve ser verificável usando o mesmo SECRET_JWT', function () {
  const secret = process.env.SECRET_JWT || 'your-secret-key';
  const decoded = jwt.verify(this.token, secret);
  this.expect(decoded).to.have.property('id');
});

// ESTRUTURA DO TOKEN
Then('o token deve ter três partes separadas por ponto', function () {
  const parts = this.token.split('.');
  this.expect(parts).to.have.lengthOf(3);
});

Then('a primeira parte deve ser o header', function () {
  const parts = this.token.split('.');
  const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
  this.expect(header).to.have.property('alg');
  this.expect(header).to.have.property('typ');
});

Then('a segunda parte deve ser o payload', function () {
  const parts = this.token.split('.');
  const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
  this.expect(payload).to.have.property('id');
});

Then('a terceira parte deve ser a assinatura', function () {
  const parts = this.token.split('.');
  this.expect(parts[2]).to.be.a('string');
  this.expect(parts[2].length).to.be.greaterThan(0);
});

// PAYLOAD
When('eu decodifico o token', function () {
  this.decodedToken = jwt.decode(this.token);
});

When('eu decodifico o header do token', function () {
  const parts = this.token.split('.');
  this.decodedHeader = JSON.parse(Buffer.from(parts[0], 'base64').toString());
});

Then('o payload deve conter o campo {string} com valor {string}', function (field, value) {
  this.expect(this.decodedToken[field]).to.equal(value);
});

Then('o payload deve conter o campo {string}', function (field) {
  this.expect(this.decodedToken).to.have.property(field);
});

Then('o payload não deve conter a senha', function () {
  this.expect(this.decodedToken).to.not.have.property('senha');
  this.expect(this.decodedToken).to.not.have.property('password');
  this.expect(this.decodedToken).to.not.have.property('senha_usuario');
});

Then('o payload não deve conter o email', function () {
  this.expect(this.decodedToken).to.not.have.property('email');
});

Then('o payload não deve conter o telefone', function () {
  this.expect(this.decodedToken).to.not.have.property('telefone');
  this.expect(this.decodedToken).to.not.have.property('phone');
});

Then('o payload deve conter apenas o id do usuário', function () {
  const allowedFields = ['id', 'iat', 'exp'];
  const tokenFields = Object.keys(this.decodedToken);

  tokenFields.forEach(field => {
    this.expect(allowedFields).to.include(field);
  });
});

// COMPARAÇÃO DE TOKENS
Then('os tokens devem ser diferentes', function () {
  this.expect(this.token1).to.not.equal(this.token2);
});

Then('cada token deve conter o ID correto do respectivo usuário', function () {
  const decoded1 = jwt.decode(this.token1);
  const decoded2 = jwt.decode(this.token2);

  this.expect(decoded1.id).to.equal(this.userId);
  this.expect(decoded2.id).to.equal(this.otherUserId);
});

Then('ambos devem conter o mesmo ID de usuário', function () {
  const decoded1 = jwt.decode(this.token1);
  const decoded2 = jwt.decode(this.token2);

  this.expect(decoded1.id).to.equal(decoded2.id);
});

Then('ambos devem ter o campo {string} diferente', function (field) {
  const decoded1 = jwt.decode(this.token1);
  const decoded2 = jwt.decode(this.token2);

  this.expect(decoded1[field]).to.not.equal(decoded2[field]);
});

// ALGORITMO
Then('o algoritmo deve ser {string}', function (algorithm) {
  this.expect(this.decodedHeader.alg).to.equal(algorithm);
});

Then('o tipo deve ser {string}', function (type) {
  this.expect(this.decodedHeader.typ).to.equal(type);
});

// LOGIN E TOKEN
Given('que existe um usuário cadastrado com email {string} e senha {string}', async function (email, password) {

  await database.deleteUserByEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  await database.createUser({
    nome: 'Usuário Teste',
    email: email,
    senha_usuario: hashedPassword,
    telefone: '11999887766'
  });

  this.testEmail = email;
  this.testPassword = password;
});

When('eu faço login com credenciais válidas', async function () {
  this.requestData = {
    email: this.testEmail,
    senha: this.testPassword
  };

  try {
    await this.makeRequest('POST', '/api/auth/login', this.requestData);
  } catch (error) {
    this.response = error.response;
  }
});

Then('o token deve estar no campo {string}', function (field) {
  this.expect(this.response.body).to.have.property(field);
  this.token = this.response.body[field];
});

Then('o token deve ser um JWT válido', function () {
  const secret = process.env.SECRET_JWT || 'your-secret-key';

  const isValid = () => {
    try {
      jwt.verify(this.token, secret);
      return true;
    } catch (error) {
      return false;
    }
  };

  this.expect(isValid()).to.be.true;
});

// DADOS SENSÍVEIS
Given('que existe um usuário com id {string} e senha {string}', function (userId, password) {
  this.userId = userId;
  this.userPassword = password;
});
